import 'dotenv/config';
import { GoogleAuth } from 'google-auth-library';
import { PlacesClient, protos } from '@googlemaps/places';

import { ItineraryType, ItineraryInterface, Place as RedPlace, placeMapper } from '../interfaces/ItineraryInterface';
import { ItineraryServiceInterface } from '../interfaces/ItineraryServiceInterface';
import itineryTypes from "../static/data/itinerary";
import suggestions from "../static/data/suggestions";
import { calculateNumberOfPlaces, generateUuid } from '../utils/utilMath';
import { provinceCoordinatesMap } from '../constants';
import { createNearbySearchRequest } from '../utils/placeUtils';

export class ItineraryService implements ItineraryServiceInterface {

  private cachedItineraries: ItineraryInterface[];
  private itineraryTypes: ItineraryType[];
  private apiKey: string;
  private placeClient: PlacesClient;
  private locationRestriction: protos.google.maps.places.v1.SearchNearbyRequest.ILocationRestriction;

  public defaultFieldsUpdated: Array<string> = [
    'places.id',
    'places.displayName',
    'places.editorialSummary',
    'places.formattedAddress',
    'places.location',
    'places.rating',
    'places.currentOpeningHours',
    'places.businessStatus',
  ]

  constructor() {
    this.cachedItineraries = suggestions; // Load from redis.
    this.itineraryTypes = itineryTypes;
    this.apiKey = process.env['GOOGLE_API_KEY'];

    const auth = new GoogleAuth({apiKey: this.apiKey}); // jsonclient
    this.placeClient = new PlacesClient({ auth });

    const province = process.env['INTINERARY_LOCATION'];
    this.locationRestriction = {
      circle: {
        center: protos.google.type.LatLng.create({
          latitude: provinceCoordinatesMap.get(province).lat,
          longitude: provinceCoordinatesMap.get(province).lng,
        }),
        radius: provinceCoordinatesMap.get(province).radius,
      }
    };
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

  async getAnItineraryByType(type: ItineraryType, ...additonalParams: any[]): Promise<ItineraryInterface> {
    // Destructure parameters.
    let { length } = additonalParams[0];

    let generatedPlaces = await this.getPlacesFromGoogle({
      type: type,
      max: calculateNumberOfPlaces(length),
    });
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

  async getPlacesFromGoogle(params: any) {
    let generatedPlaces: RedPlace[] = [];
    let { type, max } = params;

    try {
      const request = createNearbySearchRequest(type.keys, this.locationRestriction, max);
      const fetchedPlaces = await this.placeClient.searchNearby(request, this.getApiHeader());

      if (Object.keys(fetchedPlaces[0]).length > 0) {
        generatedPlaces = fetchedPlaces[0]
            .places
            .map((googlePlace) => placeMapper(googlePlace));
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

  /**
   * Fetch the FieldMask field - this will limit how many fields
   * the google API returns.
   *
   * @returns [Object] headers object with the "X-Goog-FieldMask".
   *
   * @see gax.CallOptions
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
}
