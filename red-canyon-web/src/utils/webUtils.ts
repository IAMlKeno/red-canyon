import { placesPerDay } from "@/constants";
import type { Place } from "@/models/ItineraryInterface";

export function confirmAction(msg: string): boolean {
  return confirm(msg);
}

export function getUserFriendlyDate(date: Date): string {
  return Intl.DateTimeFormat('en-ca', {
    dateStyle: "full",
  }).format(date);
}

export function dividePlaces(places: Partial<Place>[]): Partial<Place>[][] {
  const results = [];
  for (let i = 0; i < places.length; i += placesPerDay) {
    results.push(places.slice(i, i + placesPerDay));
  }

  return results;
}

/**
 * TODO: use proper date formatting and proper url building.
 * ALso need to see if I can figure out if the car is available or not.
 * @param start 
 * @param end 
 * @returns valid turo link
 */
export function turoLinkBuilder(start?: Date, end?: Date): string {
  return turoHostLinkBuilder();

  // const endDate = `${end.getDate()}/${end.getDay()}/${end.getFullYear()}`;
  // const startDate = `${start.getDate()}/${start.getDay()}/${start.getFullYear()}`;
  // const searchRegion = 'PE';
  // const randomCar = getRandomCarRecommendation();

  // return `https://turo.com/ca/en/car-rental/canada/charlottetown-pe/${randomCar}?endDate=${endDate}&startDate=${startDate}&searchRegion=${searchRegion}`
  // https://turo.com/ca/en/car-rental/canada/charlottetown-pe/volkswagen/passat/2534681?endDate=07%2F27%2F2025&endTime=10%3A00&searchId=uaP1zw57&searchRegion=PE&startDate=07%2F25%2F2025&startTime=10%3A00
}

/**
 * Get a random turo vehicle recommendation.
 *
 * @returns A valid vehicle id for that can be used when building turo link
 */
function getRandomCarRecommendation(): string {
  return 'hyundai/sonata/2026817';
}

/**
 * Get a random turo host id.
 *
 * @returns A valid vehicle id for that can be used when building turo link
 */
function getRandomTuroHostId(): string {
  return '42919014';
}

export function turoHostLinkBuilder(): string {
  const hostId = getRandomTuroHostId();
  return `https://turo.com/ca/en/drivers/${hostId}`;
}