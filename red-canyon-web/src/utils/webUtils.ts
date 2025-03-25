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
