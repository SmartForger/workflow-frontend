<template>
  <prodeo-input v-model="model" :details="details" v-if="details.type === 'QInput'"></prodeo-input>
  <prodeo-select v-model="model" :details="details" v-if="details.type === 'QSelect'"></prodeo-select>
  <prodeo-button
    :details="details"
    @trigger="triggerEvent"
    v-if="details.type === 'QBtn'"
  ></prodeo-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useModelWrapper } from 'src/common/composables/useModelWrapper';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import ProdeoButton from './button/ProdeoButton.vue';
import ProdeoInput from './input/ProdeoInput.vue';
import ProdeoSelect from './select/ProdeoSelect.vue';

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

    return { model, triggerEvent };
  },
});
</script>
