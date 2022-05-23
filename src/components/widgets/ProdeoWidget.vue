<template>
  <prodeo-input
    v-model="model"
    :details="details"
    :rules="rules"
    v-if="details.type === 'QInput'"
  ></prodeo-input>
  <prodeo-select
    v-model="model"
    :details="details"
    :rules="rules"
    v-if="details.type === 'QSelect'"
  ></prodeo-select>
  <prodeo-button
    :details="details"
    @trigger="triggerEvent"
    v-if="details.type === 'QBtn'"
  ></prodeo-button>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useModelWrapper } from 'src/common/composables/useModelWrapper';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import ProdeoButton from './button/ProdeoButton.vue';
import ProdeoInput from './input/ProdeoInput.vue';
import ProdeoSelect from './select/ProdeoSelect.vue';
import {
  checkFilterValidation,
  getValidationsFromRules,
  required,
} from 'src/common/utils/validations';
import { Filter } from 'src/common/types/Filter';

export default defineComponent({
  name: 'ProdeoWidget',
  components: {
    ProdeoButton,
    ProdeoInput,
    ProdeoSelect,
  },
  props: {
    modelValue: {
      required: false,
    },
    details: {
      type: Object as PropType<WorkflowWidget>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'trigger'],
  setup(props, { emit }) {
    const model = useModelWrapper(props, emit, '');

    const triggerEvent = () => {
      emit('trigger', props.details.event);
    };
    const rules: any[] = getValidationsFromRules(props.details.rules);

    return { model, triggerEvent, rules };
  },
});
</script>
