<script setup lang="ts">
import { ref } from 'vue'
import ItinerarySuggestion from "./ItinerarySuggestion.vue";
import ItineraryType from '../components/itinerary/ItineraryType.vue'
import Suggestion from '../components/itinerary/Suggestion.vue'

const api = import.meta.env.VITE_API;

let data = ref([]);
let suggestion = ref(null)
let suggestionLoading = ref(false)

async function fetchItineraryTypes() {
  try {
    data = await (await fetch(`${api}/places/types`)).json()
  } catch (e) {
    console.log(`ERROR FETCHING TYPES: ${e}`)
  }
}
await fetchItineraryTypes()

function handleRowClick(evt) {
  const tar = evt.target;
  if (tar.tagName.toLowerCase() !== 'button') {
    const rowId = tar.parentElement.querySelector('td[class=type-id]').dataset.typeId;
    handleFetchSuggestion(rowId);
  }
}

function handleBtnClick(id) {
  event.preventDefault();
  alert(`clicked ${id}`);
  // handleFetchSuggestion(id);
}

async function handleFetchSuggestion(itineraryTypeId: string) {
  suggestionLoading.value = true;
  suggestion.value = await (await fetch(`${api}/places/suggestion/${itineraryTypeId}`)).json();
  suggestionLoading.value = false;
}
</script>

<template>
  <div class="it-card">
    <h2 class="it-header text-center">Itinerary Planner</h2>
    <h5 class="it-sub-header text-center">Click one to get a suggestion!</h5>
    <hr />

    <div class="grid itinerary-grid">
      <ItineraryType v-for="type in data"
          :title="type.name"
          :description="type.description"
          :duration="type.expectedDuration.hours"
          @click="handleBtnClick(type.id)"
          class="clickable"
          />
    </div>

    <hr />

  </div>
  <hr />
  <Suggestion />
  <h1 v-show="suggestionLoading">Vue is generating a suggestion!</h1>
  <div v-if="suggestion != null">
    <ItinerarySuggestion :suggestion="suggestion" />
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
</style>