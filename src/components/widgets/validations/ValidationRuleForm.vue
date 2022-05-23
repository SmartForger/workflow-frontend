<template>
  <div class="row" v-if="!validationType">
    <div class="col-6">
      <select-component
        v-model="validationType"
        label="Type"
        :options="validationTypes"
        :required="true"
      ></select-component>
    </div>
  </div>
  <validation-required
    :details="details"
    @update="emit('update', $event)"
    v-if="validationType === 'required'"
  ></validation-required>
  <validation-with-number
    :details="details"
    number-field="length"
    number-field-label="Min Length"
    @update="emit('update', $event)"
    v-if="validationType === 'minlen'"
  ></validation-with-number>
  <validation-with-number
    :details="details"
    number-field="length"
    number-field-label="Max Length"
    @update="emit('update', $event)"
    v-if="validationType === 'maxlen'"
  ></validation-with-number>
  <validation-with-number
    :details="details"
    number-field="value"
    number-field-label="Minimum"
    @update="emit('update', $event)"
    v-if="validationType === 'min'"
  ></validation-with-number>
  <validation-with-number
    :details="details"
    number-field="value"
    number-field-label="Maximum"
    @update="emit('update', $event)"
    v-if="validationType === 'max'"
  ></validation-with-number>
  <validation-dynamic
    :details="details"
    @update="emit('update', $event)"
    v-if="validationType === 'dynamic'"
  ></validation-dynamic>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { validationTypes } from 'src/common/constants/validationTypes';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { ValidationRule } from 'src/common/types/ValidationRule';
import { required } from 'src/common/utils/validations';
import ValidationRequired from './ValidationRequired.vue';
import ValidationWithNumber from './ValidationWithNumber.vue';
import ValidationDynamic from './ValidationDynamic.vue';

export default defineComponent({
  components: {
    ValidationRequired,
    ValidationWithNumber,
    ValidationDynamic,
  },
  props: {
    details: {
      type: Object as PropType<ValidationRule>,
      required: true,
    },
  },
  emits: ['update', 'save', 'cancel'],
  setup(props, { emit }) {
    const { getFieldModel } = useDetailsForm<ValidationRule>(props, emit);

    const validationType = getFieldModel('type', '');
    const message = getFieldModel('message', '');

    return { validationType, message, validationTypes, emit, required };
  },
});
</script>
