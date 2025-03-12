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
  keys: string[];
  additional_keys: string[];
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
  const description =
      (gPlace.editorialSummary != undefined || gPlace.editorialSummary != null)
      && Object.keys(gPlace.editorialSummary).length > 0
        ? gPlace.editorialSummary.text.toString()
        : '';

  return {
    id: gPlace.id,
    name: gPlace.displayName.text,
    description: description,
    location: gPlace.formattedAddress.toString(),
    realLocation: {
      lat: gPlace.location.latitude,
      lng: gPlace.location.longitude
    },
    rating: gPlace.rating,
    operatingHours: gPlace.currentOpeningHours,
  } as Place;
}
