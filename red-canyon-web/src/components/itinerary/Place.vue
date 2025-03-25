<script lang="ts" setup>
import type { Place } from '@/models/ItineraryInterface';
import { confirmAction } from '../../utils/webUtils';
import { replaceOne } from '@/utils/api';
import { userStore } from '@/userStore';

const props = defineProps<{
  place: Partial<Place>;
}>();

function handleGetOneNewSuggestion() {
  if (confirmAction(`Are you sure you want to replace "${props.place.name}"?`)) {
    const oldId = props.place.id;
    replaceOne(props.place.id ?? '')
      .then((res) => {
        const updatedPlaces = userStore.currentItinerary.places.map(place => place.id == oldId ? res.data[0] : place);
        userStore.currentItinerary.places = updatedPlaces;
      })
      .catch((e) => {
        console.log(`THERE WAS AN ERROR REPLACING THE SUGGESTION ${e}`);
        alert(`THERE WAS AN ERROR REPLACING THE SUGGESTION`);
      });
  }
}

function handleMakeReservation() {
  alert('We\'re sorry, but this isn\'t implemented yet.');
}
</script>

<template>
  <div class="itinerary-place-wrapper">
    <div class="place-details">
      <h5>{{ place.name }}</h5>
      <ul>
        <li>{{ place.location }}</li>
        <li>Hours: 11am - 3pm</li>
      </ul>
      <p>{{ place.description ?? 'Description unavailable' }}</p>
    </div>

    <div class="place-rating">
      <div class="star-rating" v-for="(rating) in 5">
        <span class="fa fa-star checked" v-if="rating <= place.rating"></span>
        <span class="fa fa-star" v-else></span>
      </div>
      <div class="rating-number">
        {{ place.rating }}
      </div>
    </div>

    <div class="place-actions">
      <div class="replace-btn">
        <button type="button" class="btn btn-warning" @click="handleGetOneNewSuggestion">Replace</button>
      </div>
      <div class="view-map-btn">
        <a :href="`https://www.google.com/maps/search/?api=1&query=${place.realLocation?.lat},${place.realLocation?.lng}&query_place_id=${place.id}`"
          target="_blank" class="btn btn-primary">Map View</a>
      </div>
      <div class="reservation-btn">
        <button type="button" class="btn btn-primary" @click="handleMakeReservation">Reservation</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 374px) and (max-width: 991px) {
  .place-actions {
    row-gap: 10px;
  }
}

.place-rating {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
}

.place-rating .star-rating {
  height: fit-content
}

.place-rating .rating-number {
  flex-basis: 60%;
  font-weight: bolder;
  font-size: xxx-large;
}

.place-rating .checked {
  color: goldenrod;
}

.itinerary-place-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border-bottom: 3px solid lightgray;
  border-radius: 2%;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.itinerary-place-wrapper .place-details {
  flex-grow: 2;
  text-align: left;
  max-width: 70%;
  min-width: 70%;
}

.itinerary-place-wrapper .place-rating {
  flex-grow: 1;
  max-width: 15%;
  min-width: 15%;
}

.place-actions {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.place-actions .btn {
  width: 100%;
}

.btn-warning {
  background-color: #FB6340;
  border-color: #FB6340;
  color: #FFF;
}

</style>
