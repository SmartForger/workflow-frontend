<template>
  <q-input class="pvn-field" dense outlined v-model="model" :label="details.name">
    <template v-slot:prepend v-if="details.iconFileName || details.icon">
      <icon-renderer
        :icon="details.icon"
        :iconFileName="details.iconFileName"
        size="32px"
      ></icon-renderer>
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import { useModelWrapper } from 'src/common/composables/useModelWrapper';

export default defineComponent({
  props: {
    modelValue: {
      required: false,
    },
    details: {
      type: Object as PropType<WorkflowWidget>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = useModelWrapper(props, emit, '');
    return { model };
  },
});
</script>
