import { ItineraryType, ItineraryInterface, Place } from "./ItineraryInterface";

export interface ItineraryServiceInterface {

  /**
   * Fetch an itinerary suggestion.
   * @param type The type of itinerary to create
   */
  getAnItineraryByType(type: ItineraryType, ...additonalParams: any[]): Promise<ItineraryInterface>;

  /**
   * Get all itinerary types.
   */
  getItineraryTypes(): ItineraryType[];

  /**
   * Get all itinerary types.
   */
  getItineraryTypeById(id: string): ItineraryType|undefined;

  /**
   * Fetch the place details, this can come from Redis or
   * Google Places API.
   * @param id Place id
   */
  viewPlace(id: string): Promise<Place | undefined>;
}
