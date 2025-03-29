import { Place } from "../ItineraryInterface";

export interface PlaceCacheHandlerInterface {
  getAPlace(placeId?: string, type?: string): Promise<Place|undefined>;
  getPlaces(type: string, max: number): Promise<Place[]|undefined>;
  addAPlace(place: Place, type: string): Promise<boolean>;
  searchPlaces(query: string): Promise<{ totalResults: number, results: Array<Place> }>;
}