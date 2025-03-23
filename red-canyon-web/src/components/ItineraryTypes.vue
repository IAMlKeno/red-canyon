<script setup lang="ts">
import { ref } from 'vue'

import type { ItineraryType as Type } from '@/models/ItineraryInterface';

import ItineraryType from '../components/itinerary/ItineraryType.vue'
import Suggestion from '../components/itinerary/Suggestion.vue'
import ProgressBar from './common/ProgressBar.vue';
import FormModal from './common/FormModal.vue';
import UserInfoForm from './forms/UserInfoForm.vue';
import { userStore } from '@/userStore';
import { confirmAction } from '@/utils/webUtils';
import axios from 'axios';

const api = import.meta.env.VITE_API;
const itineraryTypes = ref<Type[]>();
const suggestion = ref(null)
const userTripInfo = ref({});
const itineraryEngineInitiated = ref(false);
const isSuggestionLoading = ref(false);
const showUserInfoModal = ref(false);

async function fetchItineraryTypes() {
  try {
    itineraryTypes.value = await (await fetch(`${api}/places/types`)).json()
  } catch (e) {
    console.log(`ERROR FETCHING TYPES: ${e}`);
    // Show error loading component
  }
}
await fetchItineraryTypes()

function handleBtnClick(id: string, event: any) {
  event.preventDefault();
  let approveChange = false;
  if (Object.keys(userStore.currentItinerary).length > 0) {
    approveChange = confirmAction("Are you sure?\nThis will erase your previously generated itinerary.");
  } else {
    approveChange = true;
  }

  if (!approveChange) return;

  itineraryEngineInitiated.value = true;
  isSuggestionLoading.value = true;
  handleFetchSuggestion(id);
}

function finishLoading() {
  isSuggestionLoading.value = false;
}

async function handleFetchSuggestion(itineraryTypeId: string) {
  console.log(`id: ${userStore.itineraryTypeId}; Dates: ${userStore.date.startDate} - ${userStore.date.endDate}`);

  axios.post(
    `${api}/places/v1/suggestion`,
    {lengthOfTrip: userStore.lengthOfTrip, type: itineraryTypeId}
  ).then((res) => {
    userStore.currentItinerary = res.data;
    finishLoading();
    console.log(userStore.currentItinerary);
  }).catch((error) => {
    console.log(error);
    // show error. ErrorLoading.vue
  })

  // setTimeout(finishLoading, 5000);
}

function getUserInfo(typeId: string) {
  showUserInfoModal.value = true;
  document.getElementById('modal-btn')?.click();
  userStore.itineraryTypeId = typeId;
}

function closeModal() {
  showUserInfoModal.value = false;
  document.querySelector('#formModal button[class="close"]')?.click();
}

const handleSubmitUserInfo = (event: any) => {
  closeModal();
  handleBtnClick(userStore.itineraryTypeId, event);
}
</script>

<template>
  <div class="it-card">
    <h2 class="it-header text-center">Itinerary Planner</h2>
    <h5 class="it-sub-header text-center">Click one to get a suggestion!</h5>
    <hr />

    <div class="grid itinerary-grid">
      <ItineraryType v-for="type in itineraryTypes"
          :title="type.name"
          :description="type.description"
          :duration="type.expectedDuration.hours"
          @click="getUserInfo(type.id)"
          class="clickable"
          />
    </div>
  </div>

  <div v-show="showUserInfoModal" class="modal" style="display: block;">
    <FormModal
      title="Trip Info"
      :handleSubmit="handleSubmitUserInfo"
    ><UserInfoForm /></FormModal>
  </div>
  <hr />
  <div v-if="itineraryEngineInitiated">
    <h3 v-if="isSuggestionLoading">
      We're generating your suggestion!
      <ProgressBar />
    </h3>
    <div v-else>
      <Suggestion />
      <!-- <ItinerarySuggestion :suggestion="suggestion" /> -->
    </div>
  </div>
</template>

<style scoped>
  .it-table th {
    font-weight: 700;
    font-size: 18px;
  }
  .clickable:hover {
    cursor: pointer;
    background-color: lightblue;
    color: white;
  }
  .itinerary-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .itinerary-grid .grid-item {
    margin-top: 10px;
    width: 30%;
  }

  @media (min-width: 374px) and (max-width: 991px) {
    .itinerary-grid .grid-item {
      flex-basis: 100%;
    }
  }
</style>