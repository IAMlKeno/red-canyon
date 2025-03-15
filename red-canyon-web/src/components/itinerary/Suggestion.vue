<script setup lang="ts">
import type { ItineraryInterface, Place as SuggestedPlace, Place as PlaceType } from '@/models/ItineraryInterface';

import Place from './Place.vue';
import { itSuggestionHeading } from '../../constants';
import { confirmAction } from '../../utils/webUtils';

let lengthOfTrip = 3;
let placesPerDay = 2;
let suggestion: ItineraryInterface = {
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
};
// let dividedPlaces = ref([]);

const dividePlaces = (places: Partial<PlaceType>[], perDay: number) => {
  const result = [];
  for (let i = 0; i < places.length; i += perDay) {
    result.push(places.slice(i, i + perDay));
  }
  return result;
}

let dividedPlaces = dividePlaces(suggestion.places, placesPerDay);
console.log(dividedPlaces);

function handleGetNewItinerary() {
  if (confirmAction('Are you sure that you want to get a new suggested Itinerary? The current one will be lost')) {
    alert(`Call get new itinerary for type (${suggestion.type.name})`);
  }
}

function handleDownloadItinerary() {
  alert('Thank you for using this Planner. Please enjoy your trip. Your itinerary will download shortly.');
}

</script>

<template>
  <div class="itinerary-header">
    <div class="text">
      <h2 class="text-center">{{ itSuggestionHeading }}</h2>
      <h5 class="text-center">Your 3 Day Foodie trip to Prince Edward Island</h5>
    </div>
    <div class="itinerary-actions">
      <div class="generate-new" title="New itinerary">
        <button type="button" class="btn btn-warning" @click="handleGetNewItinerary">
          <span class="fa fa-refresh"></span>
        </button>
      </div>
      <div class="download" title="Download itinerary">
        <button type="button" class="btn btn-success" @click="handleDownloadItinerary">
          <i class="fa fa-download"></i>
        </button>
      </div>
    </div>
  </div>
  <div class="suggestion-tab-wrapper">
    <div class="nav-wrapper">
      <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
        <li v-for="(day, index) in lengthOfTrip" class="nav-item">
              <a
                  v-if="index == 0"
                  :id="`tabs-day-${ day }-tab`"
                  :href="`#tabs-day-${ day }`"
                  :aria-controls="`tabs-day-${ day }`"
                  class="nav-link mb-sm-3 mb-md-0 active"
                  data-toggle="tab"
                  role="tab"
                  aria-selected="true"><i class="ni ni-cloud-upload-96 mr-2"></i>Day {{ day }}</a>
              <a
                  v-else
                  :id="`tabs-day-${day}-tab`"
                  :href="`#tabs-day-${ day }`"
                  :aria-controls="`tabs-day-${ day }`"
                  class="nav-link mb-sm-3 mb-md-0"
                  data-toggle="tab"
                  role="tab"
                  aria-selected="false"><i class="ni ni-cloud-upload-96 mr-2"></i>Day {{ day }}</a>
          </li>
      </ul>
    </div>
    <div class="card shadow">
      <div class="card-body">
        <div class="tab-content" id="myTabContent">

          <div
              v-for="(places, index) in dividedPlaces"
              :id="`tabs-day-${ index + 1 }`"
              :aria-labelledby="`tabs-day-${ index + 1}-tab`"
              :class="{active: index == 0}"
              class="tab-pane fade show"
              role="tabpanel">
            <div v-for="place in places" class="description">
              <Place :place="place" />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <hr />

</template>

<style scoped>
  .itinerary-header {
    display: flex;
    flex-direction: row;
  }
  .itinerary-header .text {
    flex-basis: 95%;
  }
  .itinerary-header .itinerary-actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
  }
  .itinerary-actions button {
    border-radius: 50%;
  }
  .btn-warning {
    background-color: #FB6340;
    border-color: #FB6340;
    color: #FFF;
  }
</style>