import { ItineraryInterface, ItineraryType, Place } from "../interfaces/ItineraryInterface";
import { ItineraryServiceInterface } from "../interfaces/services/ItineraryServiceInterface";

export class ItineraryHandler<T extends ItineraryServiceInterface> {

  constructor(protected readonly service: T) {}

  async getAnItinerary(type: ItineraryType, lengthOfTrip: number): Promise<ItineraryInterface | undefined> {
    return await this.service.getAnItineraryByType(type, { length: lengthOfTrip });
  }

  async getTypes(): Promise<ItineraryType[]> {
    return await this.service.getItineraryTypes();
  }

  async getTypeById(id: string): Promise<ItineraryType | undefined> {
    return await this.service.getItineraryTypeById(id);
  }

  async getOnePlace(type: ItineraryType, exclude?: string[]): Promise<Place | undefined> {
    return await this.service.getOnePlace(type, exclude)[0] ?? undefined;
  }

}