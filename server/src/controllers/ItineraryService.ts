import 'dotenv/config';
import { GoogleAuth } from 'google-auth-library';

import { ItineraryType, ItineraryInterface, Place as RedPlace, placeMapper } from '../interfaces/ItineraryInterface';
import { ItineraryServiceInterface } from '../interfaces/ItineraryServiceInterface';
import itineryTypes from "../static/data/itinerary";
import suggestions from "../static/data/suggestions";
import { calculateNumberOfPlaces, generateANumber, generateUuid } from '../utils/utilMath';
import { PlacesClient, protos } from '@googlemaps/places';
import { provinceCoordinatesMap } from '../constants';

export class ItineraryService implements ItineraryServiceInterface {

  private cachedItineraries: ItineraryInterface[];
  private itineraryTypes: ItineraryType[];
  private apiKey: string;
  private placesPerDay: number = 2;
  private placeClient: PlacesClient;
  /** location restriction */
  // private locationBias: protos.google.maps.places.v1.SearchTextRequest.ILocationBias;
  private locationBias: protos.google.maps.places.v1.SearchNearbyRequest.ILocationRestriction;

  // public locationBias: protos.google.maps.places.v1.SearchTextRequest.ILocationBias = {
  //   // rectangle: {
  //   //   high: protos.google.type.LatLng.create({latitude: 37.4161493, longitude: -122.0812166}),
  //   //   low: protos.google.type.LatLng.create({latitude: 10.4161493, longitude: -100.0812166})
  //   // }
  // };
  public defaultLangPref: string = 'en';
  public defaultRegion: string = 'ca';
  public defaultFields: Array<string> = [
    'id',
    'displayName',
    'generativeSummary',
    'formattedAddress',
    'location',
    'rating',
    'currentOpeningHours',
    'businessStatus',
  ];
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
    this.locationBias = {
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
    console.log(`API CALL LENGTH: ${length}`);

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

    // Example of a method integrating with Google Places API
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
    console.log('======= PLACES CALL =========');
    let generatedPlaces: RedPlace[] = [];
    let { type, max } = params;

    try {
      const request = this.createNearbySearchRequest(type.keys, max);
      // console.log(JSON.stringify(request));
      const fetchedPlaces = await this.placeClient.searchNearby(request, this.getApiHeader());
      // console.log(JSON.stringify(fetchedPlaces));

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
      console.log('======= PLACES CALL =========');
    }

    return generatedPlaces;
  }

  createSearchRequest(
    type: string,
    text: string = '',
    max: number | undefined = undefined,
    lang: string | null = null,
    region: string | null = null
  ): protos.google.maps.places.v1.ISearchTextRequest {
    const req: protos.google.maps.places.v1.ISearchTextRequest = {
      textQuery: type, // 'restaurant', //text,
      includedType: type, // 'restaurant',// type,
      locationBias: this.locationBias,
      languageCode: lang ?? this.defaultLangPref,
      maxResultCount: max ?? this.placesPerDay,
      regionCode: region ?? this.defaultRegion,
      strictTypeFiltering: false,
    };

    return req;
  }

  createNearbySearchRequest(
    type: string[],
    max: number | undefined = undefined,
    lang: string | null = null,
    region: string | null = null
  ): protos.google.maps.places.v1.ISearchNearbyRequest {
    const req: protos.google.maps.places.v1.ISearchNearbyRequest = {
      includedTypes: type,
      locationRestriction: this.locationBias,
      languageCode: lang ?? this.defaultLangPref,
      maxResultCount: max ?? this.placesPerDay,
      regionCode: region ?? this.defaultRegion,
    };

    return req;
  }

  private getApiHeader(): any{
    return {
      otherArgs: {
        headers: {
          // "X-Goog-FieldMask": this.defaultFields.join(','), // "*"
          "X-Goog-FieldMask": "*",
        },
      }
    };
  }
}
