<script setup lang="ts">
const props = defineProps<{
  test: string,
  types: any,
}>()

console.log(props.types);
</script>
<template>
  <div class="it-card">
    <h2>Itinerary Type Card {{ test }}</h2>
    <hr />
    <table>
      <thead>
        <tr><th>ID</th><th>Value</th></tr>
      </thead>
      <tr v-for="type in props.types">
        <td>{{ type.id }}</td><td>{{ type.value }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
  .it-card {
    border: 2px solid red;
  }
</style>