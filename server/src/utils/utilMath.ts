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
