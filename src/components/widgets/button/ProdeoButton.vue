<template>
  <q-btn dense color="primary" @click="triggerEvent">
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
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ProdeoWidget',
  props: {
    details: {
      type: Object as PropType<WorkflowWidget>,
      required: true,
    },
  },
  emits: ['trigger'],
  setup(props, { emit }) {
    const triggerEvent = () => {
      emit('trigger', props.details.event);
    };

    return { triggerEvent };
  },
});
</script>
