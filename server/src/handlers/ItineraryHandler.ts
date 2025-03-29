import { ItineraryInterface, ItineraryType } from "../interfaces/ItineraryInterface";
import { ItineraryServiceInterface } from "../interfaces/services/ItineraryServiceInterface";

export class ItineraryHandler<T extends ItineraryServiceInterface> {

  constructor(protected readonly service: T) {}

  async getAnItinerary(type: ItineraryType, lengthOfTrip: number): Promise<ItineraryInterface | undefined> {
    return await this.service.getAnItineraryByType(type, { length: lengthOfTrip });
  }

}