import 'dotenv/config';
import { GoogleAuth } from 'google-auth-library';

import { ItineraryType, ItineraryInterface, Place as RedPlace, placeMapper } from '../interfaces/ItineraryInterface';
import { ItineraryServiceInterface } from '../interfaces/ItineraryServiceInterface';
import itineryTypes from "../static/data/itinerary";
import suggestions from "../static/data/suggestions";
import { generateANumber, generateUuid } from '../utils/utilMath';
import { PlacesClient, protos } from '@googlemaps/places';
// import * from protos.google.maps.places;

export class ItineraryService implements ItineraryServiceInterface {

  private itineraries: ItineraryInterface[];
  private itineraryTypes: ItineraryType[];
  private apiKey: string;
  private placesPerDay: number = 2;

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

  constructor() {
    this.itineraries = suggestions;
    this.itineraryTypes = itineryTypes;
    this.apiKey = process.env['GOOGLE_API_KEY'];
    console.log(this.apiKey);
  }

  async getAnItineraryByType(type: ItineraryType): Promise<ItineraryInterface> {
    // ======= TEST CODE =========== //
    console.log(`Type name chosen (service): ${type.name}`);
    let n = generateANumber(4);
    console.log(`Number gen'd: ${n}`);
    // let itinerary = this.itineraries.find(item => item.id == n.toString());
    // ======= TEST CODE =========== //

    let generatedPlaces = await this.getPlaceFromGoogle({ type: type, });
    const generatedItinerary: ItineraryInterface = {
      id: generateUuid(),
      type: type,
      places: generatedPlaces
    }
    // if (!itinerary) {
    if (!generatedItinerary) {
      throw new Error(`No itinerary found for type ${type.name}`);
    }
    return generatedItinerary;
  }

  getItineraryTypes(): ItineraryType[] {
    return this.itineraryTypes;
  }

  getItineraryTypeById(id: string): ItineraryType|undefined {
    return this.itineraryTypes.find(type => type.id == id);
  }

  viewPlace(id: string): RedPlace | undefined {
    return undefined; //this.places.find(place => place.id === id);
  }

  // Example of a method integrating with Google Places API
  async getPlaceDetailsFromGoogle(placeId: string): Promise<RedPlace | undefined> {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${this.apiKey}`);
    const data = await response.json();

    if (data.status === 'OK') {
      const result = data.result;
      // Map the Google Places API response to your Place interface
      const place: RedPlace = {
        id: result.place_id,
        name: result.name,
        location: result.geometry.location, 
        realLocation: {
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
        },
        rating: result.rating,
        operatingHours: result.opening_hours,
        description: 'result.'
      };

      return place;
    } else {
      console.error(`Google Places API request failed with status: ${data.status}`);
      return undefined;
    }
  }

  async getPlaceFromGoogle(params: any) {
    console.log('======= PLACES CALL =========');
    const auth = new GoogleAuth({apiKey: this.apiKey}); // jsonclient

    const placeClient = new PlacesClient({ auth });
    let generatedPlaces: RedPlace[] = [];

    const request = this.createSearchRequest(params.type, params.type.name);

    const fetchedPlaces = await placeClient.searchText(request, {
      otherArgs: {
        headers: {
          // "X-Goog-FieldMask": this.defaultFields.join(','), // "*"
          "X-Goog-FieldMask": "*",
        },
      }
    });
    // protos.google.maps.places.v1.ISearchTextResponse
    // console.log(fetchedPlaces);
    // if (fetchedPlaces instanceof protos.google.maps.places.v1.SearchTextResponse) {
    if (fetchedPlaces[0] != null) {
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
    lang: string | null = null,
    max: number = undefined,
    region: string | null = null): protos.google.maps.places.v1.ISearchTextRequest {
    const req: protos.google.maps.places.v1.ISearchTextRequest = {
      textQuery: 'restaurant', //text,
      includedType: 'restaurant',// type,
      locationBias: this.locationBias,
      languageCode: lang ?? this.defaultLangPref,
      maxResultCount: this.placesPerDay,
      regionCode: region ?? this.defaultRegion,
      strictTypeFiltering: false,
    };

    return req;
  }
}