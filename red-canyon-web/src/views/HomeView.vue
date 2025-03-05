<script setup lang="ts">
import ItineraryTypes from '../components/ItineraryTypes.vue'
import { ref } from 'vue'

</script>

<template>
  <main>
    <Suspense>
      <ItineraryTypes />
    </Suspense>
  </main>
</template>
