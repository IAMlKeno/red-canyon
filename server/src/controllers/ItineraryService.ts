import { ItineraryType, ItineraryInterface, Place } from '../interfaces/ItineraryInterface';
import { ItineraryServiceInterface } from '../interfaces/ItineraryServiceInterface';
import itineryTypes from "../static/data/itinerary";
import suggestions from "../static/data/suggestions";
import generateANumber from '../utils/utilMath';

export class ItineraryService implements ItineraryServiceInterface {

  private itineraries: ItineraryInterface[];
  private itineraryTypes: ItineraryType[];
  private places: Place[];

  /** location restriction */
  public locationBias: any = { lat: 37.4161493, lng: -122.0812166 };
  public defaultLangPref: string = 'en-US';
  public defaultRegion: string = 'ca';
  public defaultFields: Array<string> = ['displayName', 'location', 'businessStatus'];

  constructor() {
    this.itineraries = suggestions;
    this.itineraryTypes = itineryTypes;
    // this.places = places;
  }

  // constructor(itineraries: ItineraryInterface[], itineraryTypes: ItineraryType[], places: Place[]) {
  //   this.itineraries = itineraries;
  //   this.itineraryTypes = itineraryTypes;
  //   this.places = places;
  // }

  getAnItineraryByType(type: ItineraryType): ItineraryInterface {
    // ======= TEST CODE =========== //
    console.log(`Type name chosen (service): ${type.name}`);
    let n = generateANumber(4);
    console.log(`Number gen'd: ${n}`);
    // ======= TEST CODE =========== //
    let itinerary = this.itineraries.find(item => item.id == n.toString());
    // const itinerary = this.itineraries.find(itinerary => itinerary.type.id === type.id);
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

  viewPlace(id: string): Place | undefined {
    return undefined; //this.places.find(place => place.id === id);
  }

  // Example of a method integrating with Google Places API
  async getPlaceDetailsFromGoogle(placeId: string, apiKey: string = ''): Promise<Place | undefined> {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`);
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
    const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary
    const request = this.createSearchRequest(params.type);
    const { places } = await Place.searchByText(request);
    console.log(places);

    return places;
  }
  createSearchRequest(
    type: string,
    text: string = '',
    lang: string | null = null,
    max: number = 8,
    region: string | null = null): google.maps.places.SearchByTextRequest {
    return {
      textQuery: text,
      fields: this.defaultFields,
      includedType: type,
      locationBias: this.locationBias,
      language: lang ?? this.defaultLangPref,
      maxResultCount: max,
      region: region ?? this.defaultRegion,
      useStrictTypeFiltering: false,
    };
  }
}