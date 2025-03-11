import { ItineraryService } from "../controllers/ItineraryService";
import { protos } from '@googlemaps/places';

export interface ItineraryInterface {
  id: string;
  type: ItineraryType;
  places: Place[];
}

export const itineraryMapper = (json: Record<string, any>) => {
  const obj: ItineraryInterface = {
    id: json['id'],
    type: json['type'],
    places: json['places']
  }
  return obj;
}

export interface ItineraryType {
  id: string;
  name: string;
  description: string;
  expectedDuration: { // expected duration of each event
    hours: number;
    minutes?: number; // Optional for more granularity
  };
}
export const itineraryTypeMapper = (json: Record<string, any>) => {
  return {
    id: json['id'],
    name: json['name'],
    description: json['description'],
    expectedDuration: { // expected duration of each event
      hours: json['hours'],
    }
  } as ItineraryType;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  location: any;
  realLocation: {
    lat: number;
    lng: number;
  };
  rating: any;
  operatingHours: any;
}

export const placeMapper = (gPlace: protos.google.maps.places.v1.IPlace) => {
  return {
    id: gPlace.id,
    name: gPlace.displayName.text,
    description: 'gPlace.editorialSummary.description.text.toString()',
    location: gPlace.formattedAddress.toString(),
    realLocation: {
      lat: gPlace.location.latitude,
      lng: gPlace.location.longitude
    },
    rating: gPlace.rating,
    operatingHours: gPlace.currentOpeningHours,
  } as Place;
}
