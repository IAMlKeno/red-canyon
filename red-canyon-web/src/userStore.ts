import { ref, reactive } from 'vue'
import type { ItineraryInterface } from './models/ItineraryInterface';

export const userStore = reactive({
  date: ref({
    startDate: new Date(),
    endDate: new Date(new Date().getDate() + 3),
  }),
  lengthOfTrip: 3,
  setStartDate(startDate: Date) { this.date.value.startDate = startDate; },
  setEndDate(endDate: Date) { this.date.value.endDate = endDate; },
  itineraryTypeId: '',
  currentItinerary: <ItineraryInterface>{},
  currentItineraryy: <ItineraryInterface>{
    id: 'UUID',
    type: {
      id: 'uuid',
      name: 'Foodie'
    },
    places: [
      {
        id: 'place/UUID1',
        name: "place 1",
        realLocation: {
          lat: 46.4564868,
          lng: -63.293935700000006
        },
        location: '123 Somewhere street',
        rating: 4.5,
        description: "Open from May to October, this rustic, low-key eatery features classic seafood grub & outdoor seats.",
      },
      {
        id: 'place/UUID2',
        name: "place 2",
        realLocation: {
          lat: 46.4564868,
          lng: -63.293935700000006
        },
        location: '123 Somewhere street',
        rating: 3,
        description: "Yoo hoo its a pirates life for me."
      },
      {
        id: 'place/UUID3',
        name: "place 3",
        realLocation: {
          lat: 46.4564868,
          lng: -63.293935700000006
        },
        location: '123 Somewhere street',
        rating: 5,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
      },
      {
        id: 'place/UUID4',
        name: "place 4",
        realLocation: {
          lat: 46.4564868,
          lng: -63.293935700000006
        },
        location: '123 Somewhere street',
        rating: 4.5
      },
      {
        id: 'place/UUID5',
        name: "place 5",
        realLocation: {
          lat: 46.4564868,
          lng: -63.293935700000006
        },
        location: '123 Somewhere street',
        rating: 5,
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
      },
      {
        id: 'place/UUID6',
        name: "place 6",
        realLocation: {
          lat: 46.4564868,
          lng: -63.293935700000006
        },
        location: '123 Somewhere street',
        rating: 3.5,
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
      },
    ]
  },
});
