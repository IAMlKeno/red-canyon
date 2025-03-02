import { ItineraryType } from "../../interfaces/ItineraryInterface";

const itineryTypes: ItineraryType[] = [
  {
    id: "1",
    name: 'Adventure',
    description: "Explore to your heart's content",
    expectedDuration: {
      hours: 1,
    }
  },
  {
    id: "2",
    name: 'Action',
    description: "Keep it moving in this active get-about be-about suggestion",
    expectedDuration: {
      hours: 1,
      minutes: 30
    }
  },
  {
    id: "3",
    name: 'Foodie',
    description: "Food lover's delight",
    expectedDuration: {
      hours: 2,
    }
  }];

export default itineryTypes;