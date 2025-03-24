<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { ItineraryInterface, Place as PlaceType } from '@/models/ItineraryInterface';

import Place from './Place.vue';
import { itSuggestionHeading } from '../../constants';
import { confirmAction } from '../../utils/webUtils';
import { userStore } from '@/userStore';

let lengthOfTrip = userStore.lengthOfTrip;
let placesPerDay = 2;
const suggestion = ref<ItineraryInterface|null>(null);
const dividedPlaces = ref<Partial<PlaceType>[][]>([]);

onMounted(() => {
  suggestion.value = userStore.currentItinerary;
  dividePlaces(suggestion.value.places, placesPerDay);
});

watch(
  () => userStore.currentItinerary,
  (oldValue, newValue) => {
    suggestion.value = newValue;
    dividePlaces(suggestion.value.places, placesPerDay);
  },
  { deep: true }
)

function dividePlaces(places: Partial<PlaceType>[], perDay: number) {
  const result = [];
  for (let i = 0; i < places.length; i += perDay) {
    result.push(places.slice(i, i + perDay));
  }
  dividedPlaces.value = result;
}

function handleGetNewItinerary() {
  const msg: string = 'Are you sure that you want to get a new suggested Itinerary? The current one will be lost';
  if (suggestion.value != null && confirmAction(msg)) {
    alert(`Call get new itinerary for type (${suggestion.value.type.name})`);
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
      <h5 class="text-center">Your {{ lengthOfTrip }}-day {{ suggestion != null ? suggestion.type.name : 'N/A' }} trip to Prince Edward Island</h5>
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