import { userStore } from "@/userStore";
import axios from "axios"

const API = import.meta.env.VITE_API;

export async function getTypes() {
  return await axios.get(`${API}/places/types`);
}

export async function getASuggestion() {
   return axios.post(
    `${API}/places/v1/suggestion`,
    {lengthOfTrip: userStore.lengthOfTrip, type: userStore.itineraryTypeId}
  );
}

export async function replaceOne(placeId: string) {
  if (placeId == '') {
    throw Error('Place Id is required before replacing.');
  }

  return axios.post(
    `${API}/places/v1/replace`,
    { type: userStore.currentItinerary.type.id, exclude: [placeId] }
  );
}