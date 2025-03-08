<script setup lang="ts">
import { ref } from 'vue'
import ItinerarySuggestion from "./ItinerarySuggestion.vue";

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
  handleFetchSuggestion(id);
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
    <h5 class="it-sub-header text-center">Pick an itinerary type to get started!</h5>
    <hr />
    <table class="table it-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th class="text-center">Description</th>
          <th class="text-center"><i class="material-icons">info_outline</i></th>
        </tr>
      </thead>
      <tr v-for="type in data" class="type-row clickable" @click="handleRowClick">
        <td class="type-id" v-bind:data-type-id="type.id">{{ type.id }}</td>
        <td class="type-name">{{ type.name }}</td>
        <td class="type-description text-center">{{ type.description }}</td>
        <td class="type-action td-actions"><button class="btn button btn-info" @click="handleBtnClick(type.id)">Get an Itinerary</button></td>
      </tr>
    </table>
  </div>
  <hr />
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
  }
</style>