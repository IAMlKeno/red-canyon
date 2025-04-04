import { ItineraryInterface, ItineraryType, Place } from "../interfaces/itinerary.interface";
import { ItineraryServiceInterface } from "../interfaces/services/itinerary.service.interface";

export class ItineraryHandler<T extends ItineraryServiceInterface> {

  constructor(protected readonly service: T) {}

  async getAnItinerary(type: ItineraryType, lengthOfTrip: number): Promise<ItineraryInterface | undefined> {
    return await this.service.getAnItineraryByType(type, { length: lengthOfTrip });
  }

  async getTypes(): Promise<ItineraryType[]> {
    return this.service.getItineraryTypes();
  }

  async getTypeById(id: string): Promise<ItineraryType | undefined> {
    return this.service.getItineraryTypeById(id);
  }

  async getOnePlace(type: ItineraryType, exclude?: string[]): Promise<Place | undefined> {
    const ret = await this.service.getOnePlace(type, exclude);

    return ret[0];
  }

}