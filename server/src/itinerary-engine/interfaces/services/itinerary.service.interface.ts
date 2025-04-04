import { ItineraryType, ItineraryInterface, Place } from "../itinerary.interface";

export interface ItineraryServiceInterface {

  /**
   * Fetch an itinerary suggestion.
   * @param type The type of itinerary to create
   * @param additionalParams
   * A record can be provided in these params `Record<string, any>`.
   * In the record can be: length: number (length of the trip), apiBias: a number between 0 and 1 used to determine the number of results to get from the api.
   */
  getAnItineraryByType(type: ItineraryType, ...additionalParams: any[]): Promise<ItineraryInterface | undefined>;

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
  getOnePlace(type: ItineraryType, exclude?: string[]): Promise<Place[]>;
}
