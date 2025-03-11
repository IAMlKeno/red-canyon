import 'dotenv/config';
import { GoogleAuth } from 'google-auth-library';

import { ItineraryType, ItineraryInterface, Place as RedPlace, placeMapper } from '../interfaces/ItineraryInterface';
import { ItineraryServiceInterface } from '../interfaces/ItineraryServiceInterface';
import itineryTypes from "../static/data/itinerary";
import suggestions from "../static/data/suggestions";
import { calculateNumberOfPlaces, generateUuid } from '../utils/utilMath';
import { PlacesClient, protos } from '@googlemaps/places';

export class ItineraryService implements ItineraryServiceInterface {

  private itineraries: ItineraryInterface[];
  private itineraryTypes: ItineraryType[];
  private apiKey: string;
  private placesPerDay: number = 2;
  private placeClient: PlacesClient;

  /** location restriction */
  // public locationBias: any = { lat: 37.4161493, lng: -122.0812166 };
  public locationBias: protos.google.maps.places.v1.SearchTextRequest.ILocationBias = {
    // rectangle: {
    //   high: protos.google.type.LatLng.create({latitude: 37.4161493, longitude: -122.0812166}),
    //   low: protos.google.type.LatLng.create({latitude: 10.4161493, longitude: -100.0812166})
    // }
    circle: {
      center: protos.google.type.LatLng.create({latitude: 37.4161493, longitude: -122.0812166}),
      radius: 5
    }
  };
  public defaultLangPref: string = 'en-US';
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
  // places.id,places.displayName,places.formattedAddress

  constructor() {
    this.itineraries = suggestions; // Load from redis.
    this.itineraryTypes = itineryTypes;
    this.apiKey = process.env['GOOGLE_API_KEY'];
    console.log(this.apiKey);
    const auth = new GoogleAuth({apiKey: this.apiKey}); // jsonclient
    this.placeClient = new PlacesClient({ auth });
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
    let { length } = additonalParams;

    let generatedPlaces = await this.getPlacesFromGoogle({
      type: type,
      max: length != undefined ? calculateNumberOfPlaces(length) : null,
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

    // if (placeData[0] instanceof protos.google.maps.places.v1.IPlace) {
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

    const request = this.createSearchRequest(params.type, params.type.name, params.max);
    const fetchedPlaces = await this.placeClient.searchText(request, this.getApiHeader());

    // if (fetchedPlaces[0] instanceof protos.google.maps.places.v1.ISearchTextResponse) {
    if (Object.keys(fetchedPlaces[0]).length > 0) {
      generatedPlaces = fetchedPlaces[0]
          .places
          .map((googlePlace) => placeMapper(googlePlace));
    } else {
      throw Error('Not a usable response from google');
    }

    console.log(generatedPlaces);
    console.log('======= PLACES CALL =========');

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
      textQuery: 'restaurant', //text,
      includedType: 'restaurant',// type,
      locationBias: this.locationBias,
      languageCode: lang ?? this.defaultLangPref,
      maxResultCount: max ?? this.placesPerDay,
      regionCode: region ?? this.defaultRegion,
      strictTypeFiltering: false,
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
