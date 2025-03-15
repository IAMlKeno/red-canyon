<script setup lang="ts">
import { ref } from 'vue'

import type { ItineraryType as Type } from '@/models/ItineraryInterface';

import ItineraryType from '../components/itinerary/ItineraryType.vue'
import Suggestion from '../components/itinerary/Suggestion.vue'
import ProgressBar from './common/ProgressBar.vue';

const api = import.meta.env.VITE_API;
const itineraryTypes = ref<Type[]>();
const suggestion = ref(null)
const itineraryEngineInitiated = ref(false);
const isSuggestionLoading = ref(false);

async function fetchItineraryTypes() {
  try {
    itineraryTypes.value = await (await fetch(`${api}/places/types`)).json()
  } catch (e) {
    console.log(`ERROR FETCHING TYPES: ${e}`);
    // Show error loading component
  }
}
await fetchItineraryTypes()

function handleRowClick(evt: { target: any; }) {
  const tar = evt.target;
  if (tar.tagName.toLowerCase() !== 'button') {
    const rowId = tar.parentElement.querySelector('td[class=type-id]').dataset.typeId;
    handleFetchSuggestion(rowId);
  }
}

function handleBtnClick(id: string, event: any) {
  event.preventDefault();
  const approveChange = confirm("Are you sure?\nThis will erase your previously generated itinerary.");

  if (!approveChange) return;

  alert(`change confirmed clicked ${id}`);
  itineraryEngineInitiated.value = true;
  isSuggestionLoading.value = true;
  // handleFetchSuggestion(id);
}

function finishLoading() {
  isSuggestionLoading.value = false;
}

async function handleFetchSuggestion(itineraryTypeId: string) {
  suggestion.value = await (await fetch(`${api}/places/suggestion/${itineraryTypeId}`)).json();
  finishLoading();
}
</script>

<template>
  <div class="it-card">
    <h2 class="it-header text-center">Itinerary Planner</h2>
    <h5 class="it-sub-header text-center">Click one to get a suggestion!</h5>
    <hr />

    <div class="grid itinerary-grid">
      <ItineraryType v-for="type in itineraryTypes"
          :title="type.name"
          :description="type.description"
          :duration="type.expectedDuration.hours"
          @click="handleBtnClick(type.id, $event)"
          class="clickable"
          />
    </div>

    <hr />

  </div>
  <hr />
  <div>{{ itineraryEngineInitiated }}</div>
  <div v-if="itineraryEngineInitiated">
    <h3 v-if="isSuggestionLoading">
      We're generating your suggestion!
      <button @click="finishLoading">Finish loading</button>
      <ProgressBar />
    </h3>
    <div v-else>
      <Suggestion />
      <!-- <ItinerarySuggestion :suggestion="suggestion" /> -->
    </div>
  </div>
</template>

<style scoped>
  .it-table th {
    font-weight: 700;
    font-size: 18px;
  }
  .clickable:hover {
    cursor: pointer;
    background-color: lightblue;
    color: white;
  }
  .itinerary-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .itinerary-grid .grid-item {
    margin-top: 10px;
    width: 30%;
  }

  @media (min-width: 374px) and (max-width: 991px) {
    .itinerary-grid .grid-item {
      flex-basis: 100%;
    }
  }
</style>