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

async function uclick(evt) {
  const rowId = evt.target.parentElement.querySelector('td[class=type-id]').dataset.typeId
  console.log(`row id: ${rowId}`)
  console.log(suggestionLoading.value)

  suggestionLoading.value = true
  suggestion.value = await (await fetch(`${api}/places/suggestion/${rowId}`)).json()

  suggestionLoading.value = false
  console.log(suggestion)
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
        </tr>
      </thead>
      <tr v-for="type in data" class="type-row clickable" @click="uclick">
        <td class="type-id" v-bind:data-type-id="type.id">{{ type.id }}</td>
        <td class="type-name">{{ type.name }}</td>
        <td class="type-description">{{ type.description }}</td>
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