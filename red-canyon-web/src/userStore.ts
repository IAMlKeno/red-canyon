import { ref, reactive } from 'vue'

export const userStore = reactive({
  date: ref({
    startDate: new Date(),
    endDate: new Date(new Date().getDate() + 3),
  }),
  lengthOfTrip: 3,
  setStartDate(startDate: Date) { this.date.value.startDate = startDate; },
  setEndDate(endDate: Date) { this.date.value.endDate = endDate; }
})