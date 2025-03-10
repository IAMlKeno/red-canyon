import { v4 as uuidv4 } from "uuid";

export function generateANumber(max = 3) {
  let number = Math.floor(Math.random() * max);
  return number < 1 ? 1 : number;
}

export function generateUuid(): string {
  return uuidv4();
}
