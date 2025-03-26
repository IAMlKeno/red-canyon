<script setup lang="ts">
import Popper from "vue3-popper";

const props = defineProps<{
  title: string;
  popoverContent: string;
}>();

let title = 'This is a info alert—check it out!';
let popoverContent = 'This is the Popper content 🍿';

</script>

<template>

  <div class="advertisement-notification alert alert-info alert-dismissible fade show" role="alert">
    <span class="alert-icon"><i class="fa fa-bell"></i></span>&nbsp;&nbsp;
    <span class="alert-text"><strong>Info!</strong> {{ props.title ?? title }}</span>
    <Popper class="popper-action">
      <button
          type="button"
          class="btn btn-primary "
          data-container="body"
          data-toggle="popover"
          data-color="primary"
          data-placement="top"
        >
        Click to find out!
      </button>
      <template #content>
        <div v-html="props.popoverContent ?? popoverContent" class="popover-content"></div>
      </template>
    </Popper>

    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<style lang="css" scoped>
.advertisement-notification {
  display: flex;
  align-items: center;
}
.advertisement-notification button.close {
  transform: unset;
}
.popper-action {
  margin-left: auto !important;
}
</style>