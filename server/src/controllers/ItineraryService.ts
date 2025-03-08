import { ItineraryType, ItineraryInterface, Place } from '../interfaces/ItineraryInterface'; // Assuming the interfaces are in a file called interfaces.ts
import { ItineraryServiceInterface } from '../interfaces/ItineraryServiceInterface';
import itineryTypes from "../static/data/itinerary";
import suggestions from "../static/data/suggestions";
import generateANumber from '../utils/utilMath';

export class ItineraryService implements ItineraryServiceInterface {

  private itineraries: ItineraryInterface[];
  private itineraryTypes: ItineraryType[];
  private places: Place[];

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
}