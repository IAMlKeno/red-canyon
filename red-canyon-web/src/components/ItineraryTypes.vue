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
    <h2 class="it-header">Itinerary Type Card</h2>
    <hr />
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Value</th>
          <th>Description</th>
          <th><i class="material-icons">info_outline</i></th>
        </tr>
      </thead>
      <tr v-for="type in data" class="type-row clickable" @click="handleRowClick">
        <td class="type-id" v-bind:data-type-id="type.id">{{ type.id }}</td>
        <td class="type-name">{{ type.name }}</td>
        <td class="type-description">{{ type.description }}</td>
        <td class="type-action"><button class="btn button" @click="handleBtnClick(type.id)">Get an Itinerary</button></td>
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
  .it-card {
    border: 2px solid red;
  }
  .it-card .it-header {
    text-align: center;
  }
  .type-description {
    border: 2px solid red;
    text-align: center;
  }
  .clickable:hover {
    cursor: pointer;
  }
</style>