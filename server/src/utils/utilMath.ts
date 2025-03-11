import { v4 as uuidv4 } from "uuid";
import { placesPerDay } from "../constants";

export function generateANumber(max = 3) {
  let number = Math.floor(Math.random() * max);
  return number < 1 ? 1 : number;
}

export function generateUuid(): string {
  return uuidv4();
}

export function calculateNumberOfPlaces(days: number = 1) {
    console.log(`API CALCULATION: ${days} x ${placesPerDay}`);

  return days * placesPerDay;
}
