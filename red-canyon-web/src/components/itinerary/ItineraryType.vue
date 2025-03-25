<script setup lang="ts">

defineProps<{
  title: string;
  description: string;
  duration: number;
}>()
</script>

<template>
  <div class="grid grid-item">
    <div class="grid-title">{{ title }}</div>
    <div class="grid-description">{{ description }}</div>
    <div class="duration-header">Anticipated duration per activity</div>
    <div class="duration">Hours: {{ duration }}</div>
  </div>
</template>

<style scoped>
  .grid-item {
    text-align: left;
    padding: 10px 20px;
    width: fit-content;
    border: 1px solid darkgray;
    border-radius: 20px;
  }
  .grid-title {
    font-weight: 700;
  }
  .grid-description {
    margin-bottom: 20px;
  }
  .duration-header {
    color: darkgray;
  }
  .duration {
    color: lightgray;
  }
</style>
