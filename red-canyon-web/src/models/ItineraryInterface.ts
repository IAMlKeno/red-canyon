export interface ItineraryInterface {
  id: string;
  type: Partial<ItineraryType>;
  places: Partial<Place>[];
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
