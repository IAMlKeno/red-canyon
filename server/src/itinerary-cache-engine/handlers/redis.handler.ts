import { ItineraryHandlerInterface } from "../../itinerary-engine/interfaces/handlers/itinerary.handler.interface";
import { Place } from "../../itinerary-engine/interfaces/itinerary.interface";
import {
  existsInCache,
  getPlaceFromCacheById,
  getRandomPlaceByTypeFromCache,
  storePlaceInCache } from "../utils/redis.utils";

export class RedisCacheHandler implements ItineraryHandlerInterface {
  async getAPlace(placeId?: string, type?: string): Promise<Place|undefined> {
    if (placeId) {
      // Get a place by id. An undefined type is handled.
      return await getPlaceFromCacheById(placeId, type);
    } else if (placeId == undefined && type) {
      // Get a place randomly by type.
      let place: Place | undefined = undefined;
      try {
        const placeResult = await getRandomPlaceByTypeFromCache(type, 1);
        if (placeResult.total > 0) {
          // place = placeMapper(placeResult.documents[0].value as protos.google.maps.places.v1.IPlace) Dont think this is needed as I'll be storing the objects as the Application's Place object
          place = placeResult.documents[0].value as Place;
        }
      } catch (e) {
        console.log('failed to find a place');
      } finally { return place; }
    } else {
      const msg = 'Passing neither placeId or type is invalid. Either a placeId and type are needed.';
      console.log(msg);
      throw new Error(msg);
    }
  }

  async getPlaces(type: string, max: number): Promise<Place[] | undefined> {
    let places: Place[] = [];
    try {
      let results = await getRandomPlaceByTypeFromCache(type, max);
      places = results.documents.map((place: any) => place.value as Place);
    } catch(e) {
      console.log(`Error searching places`);
    } finally {
      return places;
    }
  }

  async addAPlace(place: Place, type: string): Promise<boolean> {
    try {
      // check if the place exists before caching
      console.log(`checking if cache key exists`);
      if (!(await existsInCache(place.id, type))) {
        console.log(`not present, adding it`);
        storePlaceInCache(place, type);
      } else {
        console.log(`Might exists..., not adding to cache`);
      }
      return true; // assume success storing.
    } catch (e) {
      return false;
    }
  }

  async searchPlaces(query: string): Promise<{ totalResults: number, results: Array<Place> }> {
    throw new Error('not implemented');
  }
}