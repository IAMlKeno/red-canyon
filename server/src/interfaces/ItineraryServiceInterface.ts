import { ItineraryType, ItineraryInterface, Place } from "./ItineraryInterface";

export interface ItineraryServiceInterface {

  /**
   * Fetch an itinerary suggestion.
   * @param type The type of itinerary to create
   */
  getAnItineraryByType(type: ItineraryType): ItineraryInterface;

  /**
   * Get all itinerary types.
  */
  getItineraryTypes(): ItineraryType[];
  
  /**
  * Get all itinerary types.
  */
  getItineraryTypeById(id: string): ItineraryType|undefined;

  viewPlace(id: string): Place|undefined;
}