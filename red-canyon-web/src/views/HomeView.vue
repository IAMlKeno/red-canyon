<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { defineAsyncComponent } from 'vue'
import ItineraryTypes from '../components/ItineraryTypes.vue'
import { ref } from 'vue'

let test = 'gettypes'
let types = ref([
  { id: "1", value: "one" },
  { id: "2", value: "two" },
  { id: "3", value: "three" }
])
</script>

<template>
  <main>
    <ItineraryTypes :test="test" :types="types" />
  </main>
</template>
