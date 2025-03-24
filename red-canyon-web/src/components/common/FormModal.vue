<script setup lang="ts">

/**
 * This form modal will be used to show any forms. It expects the following props to be passing:
 *
 * @title: string - Modal title
 * @cancelTxt?: string - Text for the Cancel btn. Default "Close";
 * @confirmTxt?: string - Text for the Confirm btn. Default "Save";
 * @handleSubmit?: Function - Custom fn for the form submit. If not passed, the default action will attempt to submit the form.
 * @cancelAction?: Function - Custom fn for the cancel btn. If not passed, the modal will simply close.
 * @body: any - Object to show in the modal. Deprecated as the modal will display a slot <FormModal><slot /></FormModal>;
 */

const props = defineProps<{
  title: string;
  cancelTxt?: string;
  confirmTxt?: string;
  handleSubmit?: Function;
  handleCancelSubmit?: Function;
}>();

const defaultSubmitAction = (event: any) => {
  event.preventDefault();
  alert('attempting to submit form');
}
const defaultCancelAction = (event: any) => {
  closeModal();
  return;
}

function closeModal() {
  const modalDiv = document.querySelector('div[class="modal"]');
  if (modalDiv) {
    modalDiv.classList.add('hidden');
  }
}
function openModal() {
  const modalDiv = document.querySelector('div[class*="modal"]');
  if (modalDiv) {
    modalDiv.classList.remove('hidden');
  }
}

</script>

<template>
  <!-- Modal -->
  <button type="button" id="modal-btn" class="btn btn-primary hidden invisible" data-toggle="modal"
    data-target="#formModal" @click="openModal">
    Launch modal
  </button>

  <div class="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="formModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="formModalLabel">{{ props.title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary"
            @click="props.handleCancelSubmit != undefined ? props.handleCancelSubmit($event) : defaultCancelAction($event)" data-dismiss="modal">{{
              props.cancelTxt ?? "Close" }}</button>
          <button type="button" class="btn btn-primary"
            @click="props.handleSubmit != undefined ? props.handleSubmit($event) : defaultSubmitAction($event)">{{ props.confirmTxt
            ?? "Save" }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
