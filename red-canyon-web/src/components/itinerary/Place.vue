<script lang="ts" setup>
import type { Place } from '@/models/ItineraryInterface';

const props = defineProps<{
  place: Partial<Place>;
}>();

</script>

<template>
  <div class="itinerary-place-wrapper">
    <div class="place-details">
      <p>
      <h5>{{ place.name }}</h5>
      </p>
      <p>
      <ul>
        <li>{{ place.location }}</li>
        <li>Hours: 11am - 3pm</li>
      </ul>
      </p>
      <p>Description</p>
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
        <button type="button" class="btn btn-warning">Replace</button>
      </div>
      <div class="view-map-btn">
        <a :href="`https://www.google.com/maps/search/?api=1&query=${place.realLocation?.lat},${place.realLocation?.lng}&query_place_id=${place.id}`"
          target="_blank" class="btn btn-primary">Map View</a>
      </div>
      <div class="reservation-btn">
        <button type="button" class="btn btn-primary">Reservation</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  justify-content: space-evenly;
  border-bottom: 3px solid lightgray;
  border-radius: 2%;
}

.itinerary-place-wrapper .place-details {
  flex-grow: 2;
  text-align: left;
}

.itinerary-place-wrapper .place-rating {
  flex-grow: 1;
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