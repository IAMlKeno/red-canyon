import { ItineraryType } from "../../interfaces/ItineraryInterface";

export const itineraryTypes: ItineraryType[] = [
  {
    id: "1",
    keys: ["tourist_attraction", "art_gallery", "aquarium", "museum", "spa"],
    additional_keys: ["music", "gallery", "walking_tour", "tour"],
    name: 'Adventure',
    description: "Explore to your heart's content",
    expectedDuration: {
      hours: 1,
    }
  },
  {
    id: "2",
    keys: ["amusement_park", "campground", "night_club"],
    additional_keys: ["park", "tour", "trail", "biking"],
    name: 'Action',
    description: "Keep it moving in this active get-about be-about suggestion",
    expectedDuration: {
      hours: 1,
      minutes: 30
    }
  },
  {
    id: "3",
    keys: ["restaurant", "cafe",],
    additional_keys: ["pub", "diner", "food_shack"],
    name: 'Foodie',
    description: "Food lover's delight",
    expectedDuration: {
      hours: 2,
    }
  }
];

/**
 * This is a mapped record of string queries to be used
 * for the Places API searchByText. They are expected to be combined
 * with the province the app is used for.
 */
export const itineraryQueries: Record<string, Array<string>> = {
  foodie: [
    'best restaurant in',
    'best cafe in',
    'best seafood restaurant in',
    'best restaurant in',
  ],
  action: [
    'best biking trail in',
    'best biking tours in',
  ],
  adventure: [
    'best tours in',
    'best walking tours in',
    'best cycling tours in',
    'best biking tours in',
    'water parks in',
  ]
}