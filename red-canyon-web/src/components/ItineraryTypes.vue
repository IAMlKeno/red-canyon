<script setup lang="ts">
import { ref } from 'vue'

import type { ItineraryType as Type } from '@/models/ItineraryInterface';

import ErrorLoading from './common/ErrorLoading.vue';
import FormModal from './common/FormModal.vue';
import ProgressBar from './common/ProgressBar.vue';
import ItineraryType from '../components/itinerary/ItineraryType.vue'
import Suggestion from '../components/itinerary/Suggestion.vue'
import UserInfoForm from './forms/UserInfoForm.vue';

import { userStore } from '@/userStore';
import { confirmAction, getUserFriendlyDate, turoLinkBuilder } from '@/utils/webUtils';
import { getASuggestion, getTypes } from '@/utils/api';
import QuickAdvertisement from './common/QuickAdvertisement.vue';

const itineraryTypes = ref<Type[]>();
const itineraryEngineInitiated = ref(false);
const isSuggestionLoading = ref(false);
const showUserInfoModal = ref(false);
const isError = ref(false);
const showAdvertisement = ref(false);
const advertisementContent = ref('');
const advertisementTitle = ref('');

async function fetchItineraryTypes() {
  try {
    itineraryTypes.value = (await getTypes()).data;
  } catch (e) {
    console.log(`ERROR FETCHING TYPES: ${e}`);
    // Show error loading component
  }
}
await fetchItineraryTypes()

function handleBtnClick(id: string, event: any): void {
  event.preventDefault();
  let approveChange = false;
  if (Object.keys(userStore.currentItinerary).length > 0) {
    approveChange = confirmAction("Are you sure?\nYour previously generated itinerary will be lost.");
  } else {
    approveChange = true;
  }

  if (!approveChange) return;

  itineraryEngineInitiated.value = true;
  isSuggestionLoading.value = true;

  Promise.all([
    handleFetchSuggestion(),
    handleGetTuroRecommendation(),
    handleUpdateAdvertisementTitle(),
  ]).then((res) => {
    showAdvertisement.value = true;
  }).catch((e) => {
    console.log(`Some error occurred process the itinerary builder: ${e}`);
    showAdvertisement.value = false;
  });
}

function handleUpdateAdvertisementTitle(): void {
  advertisementTitle.value = `Need a car rental for (${getUserFriendlyDate(userStore.date.startDate)} to ${getUserFriendlyDate(userStore.date.endDate)})?`;
}

/**
 * This may become an async call. If an http call is made
 * to check the availability of the vehicle.
 */
function handleGetTuroRecommendation(): void {
  const href: string = turoLinkBuilder(userStore.date.startDate, userStore.date.endDate)
  advertisementContent.value = `<a href="${href}">Check this vehicle out!</a>`;
}

function finishLoading(): void {
  isSuggestionLoading.value = false;
}

async function handleFetchSuggestion(): Promise<void> {
  getASuggestion()
    .then((res) => {
      userStore.currentItinerary = res.data;
      isError.value = false;
      finishLoading();
    }).catch((error) => {
      console.log(error);
      // show error. ErrorLoading.vue
      isError.value = true;
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

  <div v-if="showAdvertisement">
    <QuickAdvertisement :title="advertisementTitle" :popoverContent="advertisementContent"/>
  </div>
  <span v-else>------</span>

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
    <div v-else-if="isSuggestionLoading == false && isError">
      <ErrorLoading>Uh oh! 😨 There was an error loading the suggestion.</ErrorLoading>
    </div>
    <div v-else>
      <Suggestion />
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
