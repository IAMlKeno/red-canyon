<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  test: string,
  types: any,
}>()

let data = ref([]);

async function fetchItineraryTypes() {
  try {
    data = await (await fetch("http://localhost:4200/places/types")).json()
    const rows = document.querySelectorAll("tr[class=type-row]")
      rows.forEach(row => {
      row.addEventListener("click", (e) => console.log('clicked'));
    });
  } catch (e) {
    console.log(`ERROR FETCHING TYPES: ${e}`)
  }
}
await fetchItineraryTypes()

function uclick(evt) {
  const rowId = evt.target.parentElement.querySelector('td[class=type-id]').dataset.typeId
  console.log(`row id: ${rowId}`)
}
</script>

<template>
  <div class="it-card">
    <h2>Itinerary Type Card {{ test }}</h2>
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
</template>

<style scoped>
  .it-card {
    border: 2px solid red;
  }
  .type-description {
    border: 2px solid red;
    text-align: center;
  }
  .clickable:hover {
    cursor: pointer;
  }
</style>