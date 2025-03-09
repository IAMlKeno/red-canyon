import { GoogleAuth } from 'google-auth-library';

import { ItineraryType, ItineraryInterface, Place as RedPlace } from '../interfaces/ItineraryInterface';
import { ItineraryServiceInterface } from '../interfaces/ItineraryServiceInterface';
import itineryTypes from "../static/data/itinerary";
import suggestions from "../static/data/suggestions";
import generateANumber from '../utils/utilMath';
import { PlacesClient, protos } from '@googlemaps/places';
// import * from protos.google.maps.places;

export class ItineraryService implements ItineraryServiceInterface {

  private itineraries: ItineraryInterface[];
  private itineraryTypes: ItineraryType[];
  private apiKey: string;

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
  public defaultFields: Array<string> = ['displayName', 'location', 'businessStatus'];

  constructor() {
    this.itineraries = suggestions;
    this.itineraryTypes = itineryTypes;
    this.apiKey = process.env.GOOGLE_API_KEY;
    console.log(this.apiKey);
  }
  
  // constructor(itineraries: ItineraryInterface[], itineraryTypes: ItineraryType[]) {
    //   this.itineraries = itineraries;
    //   this.itineraryTypes = itineraryTypes;
    //   this.apiKey = process.env.GOOGLE_API_KEY;
    //   console.log(this.apiKey);
  // }

  getAnItineraryByType(type: ItineraryType): ItineraryInterface {
    // ======= TEST CODE =========== //
    console.log(`Type name chosen (service): ${type.name}`);
    let n = generateANumber(4);
    console.log(`Number gen'd: ${n}`);
    // ======= TEST CODE =========== //
    let itinerary = this.itineraries.find(item => item.id == n.toString());
    // const itinerary = this.itineraries.find(itinerary => itinerary.type.id === type.id);
    let itineraryy = this.getPlaceFromGoogle({ type: type, });
    if (!itinerary) {
      throw new Error(`No itinerary found for type ${type.name}`);
    }
    return itinerary;
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
      const place: Place = {
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
    // const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=YOUR_LOCATION&radius=5000&type=${placeTypes[type]}&key=${GOOGLE_PLACES_API_KEY}`;
    // const authClient = new GoogleAuth().fromAPIKey(this.apiKey);
    console.log('======= PLACES CALL =========');
    console.log(`API KEY: ${this.apiKey}`);
    const auth = new GoogleAuth({apiKey: this.apiKey}); // jsonclient

    // const { Place, PlacesService } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary
    // const placeClient = new PlacesClient({auth: authClient});
    const placeClient = new PlacesClient({ auth });

    const request = this.createSearchRequest(params.type, params.type.name);
    // const { places } = await Place.searchByText(request);
    const places = await placeClient.searchText(request, {
      otherArgs: {
        headers: {
          "X-Goog-FieldMask": "*",
        },
      }
    });
    console.log(places);
    console.log('======= PLACES CALL =========');

    // const itinerary: ItineraryInterface = {
    //   id: '',
    //   type: params.type.name,
    //   places: places.map((place) => {
    //     return {
    //       id: place.
    //     }
    //   })
    // }

    const generatedPlaces: RedPlace[] = [];

    return places;
  }
  createSearchRequest(
    type: string,
    text: string = '',
    lang: string | null = null,
    max: number = 8,
    region: string | null = null): protos.google.maps.places.v1.ISearchTextRequest {
    // region: string | null = null): google.maps.places.SearchByTextRequest {
    return {
      textQuery: 'restaurant', //text,
      // fields: this.defaultFields,
      includedType: 'restaurant',// type,
      locationBias: this.locationBias,
      languageCode: lang ?? this.defaultLangPref,
      // language: lang ?? this.defaultLangPref,
      maxResultCount: max,
      regionCode: region ?? this.defaultRegion,
      // region: region ?? this.defaultRegion,
      strictTypeFiltering: false,
      // useStrictTypeFiltering: false,
    };
  }
}