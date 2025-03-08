<script setup lang="ts">
import { itSuggestionHeading } from '../constants'

const props = defineProps<{
  suggestion: any,
}>()
</script>

<template>
  <h2 class="text-center">{{ itSuggestionHeading }}</h2>
  <div>{{ suggestion }}</div>
</template>