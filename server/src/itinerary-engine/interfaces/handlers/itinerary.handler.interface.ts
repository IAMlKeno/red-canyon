import { ItineraryType, Place } from "../itinerary.interface";

export interface ItineraryHandlerInterface {
  getAPlace(placeId?: string, type?: string): Promise<Place|undefined>;
  getPlaces(type: ItineraryType, max: number): Promise<Place[]|undefined>;
  addAPlace(place: Place, type: string): Promise<boolean>;
  searchPlaces(query: string): Promise<{ totalResults: number, results: Array<Place> }>;
}