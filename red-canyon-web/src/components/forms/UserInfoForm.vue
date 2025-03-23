<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { userStore } from '@/userStore';

let componentDate = ref();

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 3));

  componentDate.value = [startDate, endDate];
})

function calculateLengthOfTrip() {
    const { startDate, endDate } = userStore.date;
    userStore.lengthOfTrip = (endDate.getDate() + 1) - startDate.getDate();
  }
function updateDateState() {
  [userStore.date.startDate, userStore.date.endDate] = componentDate.value;
}

</script>

<template>
  <div class="form">
    <form id="trip-info-form">

      <VueDatePicker v-model="componentDate" range @update:model-value="updateDateState();calculateLengthOfTrip();" />

      <div class="form-group">
          <label for="trip-length" class="form-control-label">Length of trip in days</label>
          <input name="trip-length" class="form-control" type="number" disabled v-model="userStore.lengthOfTrip" >
      </div>

    </form>
  </div>
</template>
