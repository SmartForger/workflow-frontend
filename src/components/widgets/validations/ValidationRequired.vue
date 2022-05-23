<template>
  <div class="row" >
    <div class="col-6">
      <select-component
        v-model="validationType"
        label="Type"
        :options="validationTypes"
        :required="true"
      ></select-component>
    </div>
    <div class="col-12">
      <q-input class="pvn-field" dense outlined v-model="message" label="Message"></q-input>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { ValidationRule } from 'src/common/types/ValidationRule';
import { validationTypes } from 'src/common/constants/validationTypes';

export default defineComponent({
  props: {
    details: {
      type: Object as PropType<ValidationRule>,
      required: true,
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const { getFieldModel } = useDetailsForm<ValidationRule>(props, emit);

    const validationType = getFieldModel('type', '');
    const message = getFieldModel('message', '');

    return { validationType, message, validationTypes };
  },
});
</script>
