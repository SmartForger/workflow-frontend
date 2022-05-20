<template>
  <q-input
    class="pvn-field"
    :label="details.name"
    :dense="details.extra.dense"
    :outlined="details.extra.outlined"
    :filled="details.extra.filled"
    :rounded="details.extra.rounded"
    :square="details.extra.square"
    v-model="model"
  >
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
