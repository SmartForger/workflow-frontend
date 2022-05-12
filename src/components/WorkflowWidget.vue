<template>
  <q-input
    class="pvn-field"
    dense
    outlined
    v-model="model"
    :label="details.name"
    v-if="details.type === 'QInput'"
  >
    <template v-slot:prepend v-if="details.iconFileName || details.icon">
      <icon-renderer
        :icon="details.icon"
        :iconFileName="details.iconFileName"
        size="32px"
      ></icon-renderer>
    </template>
  </q-input>
  <q-btn dense color="primary" @click="triggerEvent" v-if="details.type === 'QBtn'">
    <icon-renderer
      :icon="details.icon"
      :iconFileName="details.iconFileName"
      size="24px"
      v-if="details.icon || details.iconFileName"
    ></icon-renderer>
    <span class="q-mx-sm">{{ details.name }}</span>
  </q-btn>
</template>

<script lang="ts">
import { useModelWrapper } from 'src/common/composables/useModelWrapper';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import { defineComponent, PropType } from 'vue';
import IconRenderer from './IconRenderer.vue';

export default defineComponent({
  components: { IconRenderer },
  name: 'WorkflowWidgetComponent',
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
