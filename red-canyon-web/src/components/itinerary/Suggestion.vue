<script setup lang="ts">
import type { ItineraryInterface, Place as PlaceType } from '@/models/ItineraryInterface';
import Place from './Place.vue';
import { ref } from 'vue';

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
        lat: 123,
        lng: 234
      },
      location: '123 Somewhere street',
      rating: 4.5
    },
    {
      id: 'place/UUID2',
      name: "place 2",
      realLocation: {
        lat: 123,
        lng: 234
      },
      location: '123 Somewhere street',
      rating: 4.5
    },
    {
      id: 'place/UUID3',
      name: "place 3",
      realLocation: {
        lat: 123,
        lng: 234
      },
      location: '123 Somewhere street',
      rating: 4.5
    },
    {
      id: 'place/UUID4',
      name: "place 4",
      realLocation: {
        lat: 123,
        lng: 234
      },
      location: '123 Somewhere street',
      rating: 4.5
    },
    {
      id: 'place/UUID5',
      name: "place 5",
      realLocation: {
        lat: 123,
        lng: 234
      },
      location: '123 Somewhere street',
      rating: 4.5
    },
    {
      id: 'place/UUID6',
      name: "place 6",
      realLocation: {
        lat: 123,
        lng: 234
      },
      location: '123 Somewhere street',
      rating: 4.5
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

</script>

<template>
  <div class="suggestion-tab-wrapper">
    <div class="nav-wrapper">
      <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
        <li v-for="(day, index) in lengthOfTrip" class="nav-item">
              <a
                  v-if="index == 0"
                  :id="`tabs-day-${day}-tab`"
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