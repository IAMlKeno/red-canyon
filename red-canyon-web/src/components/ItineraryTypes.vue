<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  test: string,
  types: any,
  // data: any|undefined,
}>()

let data = ref([]);

async function fetchItineraryTypes() {
  try {
   data = await (await fetch("http://localhost:4200/places/types")).json()
    // data = (await fetch("http://red-canyon-server-1:4200/places/types"))
   console.log('DATA')
   console.log(data)
  } catch (e) {
    console.log(`ERROR FETCHING TYPES: ${e}`)
  }
}
await fetchItineraryTypes()

// console.log('props.data');
// console.log(props.data);
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
      <tr v-for="type in data">
        <td class="type-id">{{ type.id }}</td>
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
</style>