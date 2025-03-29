import { v4 as uuidv4 } from "uuid";
import { DEFAULT_PLACES_PER_DAY } from "../constants";

export function generateANumber(max = 3): number {
  let number = Math.floor(Math.random() * max);
  return number < 1 ? 1 : number;
}

export function generateUuid(): string {
  return uuidv4();
}

export function calculateNumberOfPlaces(days: number = 1): number {
  return days * DEFAULT_PLACES_PER_DAY;
}

/**
 * The goal of this function is to calculate how many places to get from
 * the Google Places API and the Cache.
 * 
 * This function will take the total number of places to get and use the [apiBias]
 * to calculate how many places to fetch from the cache and places from the API.
 *
 * @param placesToGet The total number of places to get.
 * @param apiBias A number between 0 and 1 used to decide the percentage bais "for"
 *  the api. Defaults to 1.
 */
export function calculateCacheApiBias(placesToGet: number, apiBias: number = 1): { cachePlaces: number, apiPlaces: number } {
  try {
    let apiPlaces: number = Math.ceil(placesToGet * apiBias);
    let cachePlaces: number = placesToGet - apiPlaces;

    return { cachePlaces: cachePlaces, apiPlaces: apiPlaces};
  } catch (e) {
    return { cachePlaces: 0, apiPlaces: placesToGet};
  }
}

