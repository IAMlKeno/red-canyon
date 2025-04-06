import 'dotenv/config';
import { PlacesClient, protos } from '@googlemaps/places';

import { ItineraryType, ItineraryInterface, Place as RedPlace, placeMapper } from '../interfaces/itinerary.interface';
import { calculateCacheApiBias, calculateNumberOfPlaces, generateUuid } from '../../utils/math.utils';
import { DEFAULT_PLACE_SEARCH_ATTEMPTS, provinceCoordinatesMap } from '../../constants';
import { createNearbySearchRequest, createSearchRequest, getRandomArrayEntry } from '../utils/itinerary.utils';
import { ItineraryHandlerInterface } from '../interfaces/handlers/itinerary.handler.interface';
import { RedisCacheHandler } from '../../itinerary-cache-engine/handlers/redis.handler';
import { ItineraryServiceInterface } from '../interfaces/services/itinerary.service.interface';
import { itineraryQueries, itineraryTypes } from '../static/data/itinerary';

export class ItineraryService<T extends PlacesClient> implements ItineraryServiceInterface {

  private itineraryTypes: ItineraryType[];
  private locationRestriction: protos.google.maps.places.v1.SearchNearbyRequest.ILocationRestriction;
  protected province: string;

  public defaultFieldsUpdated: Array<string> = [
    'places.id',
    'places.displayName',
    'places.editorialSummary',
    'places.formattedAddress',
    'places.location',
    'places.rating',
    'places.currentOpeningHours',
    'places.businessStatus',
  ];
  private cacheService: ItineraryHandlerInterface;

  constructor(private placeClient: T) {
    this.itineraryTypes = itineraryTypes;

    this.province = process.env['INTINERARY_LOCATION'];
    this.locationRestriction = {
      circle: {
        center: protos.google.type.LatLng.create({
          latitude: provinceCoordinatesMap.get(this.province).lat,
          longitude: provinceCoordinatesMap.get(this.province).lng,
        }),
        radius: provinceCoordinatesMap.get(this.province).radius,
      }
    };
    this.cacheService = new RedisCacheHandler();
  }

  getItineraryTypes(): ItineraryType[] {
    return this.itineraryTypes;
  }

  getItineraryTypeById(id: string): ItineraryType|undefined {
    return this.itineraryTypes.find(type => type.id == id);
  }

  async viewPlace(id: string): Promise<RedPlace | undefined> {
    return await this.getPlaceDetailsFromGoogle(id);
  }

  /** TODO: this need to bias the fetching from the api and cache
  // TODO: this needs to bias the results from places api. Plan to accomplish
  this by altering the use of searchNearyby and searchByText, also update the 
  Bias/scoring filter used
  */
  async getAnItineraryByType(type: ItineraryType, ...additionalParams: any[]): Promise<ItineraryInterface> {
    // Destructure parameters.
    let { length, apiBias } = additionalParams[0];
    let generatedPlaces: RedPlace[] = [];

    // attempt to get some places from cache first
    let numOfPlaces = calculateNumberOfPlaces(length);
    let { cachePlaces, apiPlaces } = calculateCacheApiBias(numOfPlaces, apiBias);

    console.log(`total places to get: ${numOfPlaces}: from api: ${apiPlaces}, from cache ${cachePlaces}`);
    let cachedPlaces: RedPlace[] = await this.getPlacesFromCache({
      type: type,
      max: cachePlaces, // ensure that null or undefined isn't returned.
    });

    // If the cache lookup fails, get all places from the API.
    if (cachedPlaces.length == 0) {
      apiPlaces = numOfPlaces;
    } else if ((apiPlaces + cachedPlaces.length) < numOfPlaces) {
      // If the cache returns less results than the number requested
      // then get the remainder from the api.
      apiPlaces += numOfPlaces - (apiPlaces + cachedPlaces.length);
      generatedPlaces.push(...cachedPlaces);
    }

    console.log(`PLACES FROM CACHE: ${cachedPlaces.length}`);
    let placesFromApi = await this.getPlacesFromGoogle({
      type: type,
      max: apiPlaces ?? numOfPlaces, // ensure that null or undefined isn't returned.
    });
    generatedPlaces.push(...placesFromApi);
    console.log(`ALL placess: ${generatedPlaces}`);

    const generatedItinerary: ItineraryInterface = {
      id: generateUuid(),
      type: type,
      places: generatedPlaces
    }

    if (!generatedItinerary) {
      throw new Error(`No itinerary found for type ${type.name}`);
    }
    return generatedItinerary;
  }

  async getPlaceDetailsFromGoogle(placeId: string): Promise<RedPlace | undefined> {
    const req: protos.google.maps.places.v1.IGetPlaceRequest = { name: `places/${placeId}`};
    let placeData = await this.placeClient.getPlace(req, this.getApiHeader());

    if (Object.keys(placeData[0]).length > 0) {
      // Map the Google Places API response to your Place interface
      const place = placeMapper(placeData[0]);

      return place;
    } else {
      console.error(`Google Places API request failed `);
      return undefined;
    }
  }

  async getOnePlace(type: ItineraryType, exclude?: string[]): Promise<RedPlace[]> {
    const retries = DEFAULT_PLACE_SEARCH_ATTEMPTS;
    let isSearching = true;
    let generatedPlace: RedPlace[] = [];
    let searchAttempts = 0;

    try {
      while (isSearching && searchAttempts < retries) {
        searchAttempts++;
        // search redis first
        generatedPlace = await this.getPlacesFromCache({ type, max: 1 });

        if (generatedPlace.length > 0 && (!exclude || !exclude.includes(generatedPlace[0].id))) {
          // Found a suitable place in the cache
          isSearching = false;
        } else {
          // 2. Cache miss or place is excluded, try Google Places API
          generatedPlace = await this.getPlacesFromGoogle({
            type: type,
            max: 1
          });

          // If we find a place from the API and it's not excluded, we're done
          if (generatedPlace.length > 0 && (!exclude || !exclude.includes(generatedPlace[0].id))) {
            isSearching = false;
          }
        }
      }
      console.log(generatedPlace);
      if (isSearching) {
        // Couldn't find a suitable place after retries
        console.log(`FAILED to get a suitable place after ${retries} attempts`);
      }
    } catch (e) {
      console.log(`FAILED to get one ${e}`);
    }
    finally {
      return generatedPlace;
    }
  }

  async getPlacesFromGoogle(params: { type: ItineraryType, max: number}): Promise<RedPlace[]> {
    let generatedPlaces: RedPlace[] = [];
    let fetchedPlaces = [];
    let { type, max } = params;

    try {
      if (this.useApiTextSearch()) {
        let key: string | undefined;
        let query: string | undefined;
        ({ key, query, fetchedPlaces } = await this.useTextSearch(type, max, fetchedPlaces));
        if (fetchedPlaces.length == 0) {
          console.log(`got no places using query and key: ${key}: ${query}`);
          console.log(`using nearby search`);
          fetchedPlaces = await this.useNearbySearch(type, max, fetchedPlaces);
        }
      } else {
        fetchedPlaces = await this.useNearbySearch(type, max, fetchedPlaces);
      }

      if (Object.keys(fetchedPlaces[0]).length > 0) {
        generatedPlaces = fetchedPlaces[0]
            .places
            .map((googlePlace: any) => {
              let place = placeMapper(googlePlace);
              return place;
            });

        // Cache the places.
        this.cachePlaces(generatedPlaces, type.name);
      } else {
        throw Error('Not a usable response from google');
      }

      console.log(generatedPlaces);
    } catch(e) {
      console.log(`AN ERROR OCCURRED FETCHING ${e.toString()}`);
    } finally {
      return generatedPlaces;
    }
  }

  private async useTextSearch(type: ItineraryType, max: number, fetchedPlaces: any[]) {
    const key: string = getRandomArrayEntry(type.keys);
    const query: string = `${getRandomArrayEntry(itineraryQueries[type.name.toLowerCase()][key])} ${this.province}`;
    const request = createSearchRequest(key, query, max, this.locationRestriction);
    fetchedPlaces = await this.placeClient.searchText(request, this.getApiHeader());
    return { key, query, fetchedPlaces };
  }

  private async useNearbySearch(type: ItineraryType, max: number, fetchedPlaces: any[]) {
    const request = createNearbySearchRequest(type.keys, this.locationRestriction, max);
    fetchedPlaces = await this.placeClient.searchNearby(request, this.getApiHeader());
    return fetchedPlaces;
  }

  private async getPlacesFromCache(params: any): Promise<RedPlace[]> {
    let { type, max } = params;
    try {
      return this.cacheService.getPlaces(type, max);
    } catch (e) {
      console.log('CACHE LOOK UP FAILED IN THE SERVICE.');
      console.log(e);
      return [];
    }
  }

  /**
   * Fetch the FieldMask field - this will limit how many fields
   * the google API returns.
   *
   * @returns [Object] headers object with the "X-Goog-FieldMask".
   *
   * @see gax.CallOptions.otherArgs
   */
  private getApiHeader(): any {
    return {
      otherArgs: {
        headers: {
          "X-Goog-FieldMask": this.defaultFieldsUpdated.join(','),
        },
      }
    };
  }

  private async cachePlaces(places: RedPlace[], type: string) {
    if (!places || places.length <= 0) return;
    places.forEach((place) => this.cacheService.addAPlace(place, type));
  }

  private useApiTextSearch(): boolean {
    return Math.random() < 0.5;
  }
}
