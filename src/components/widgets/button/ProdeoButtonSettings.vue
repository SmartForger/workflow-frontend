<template>
  <q-input
    class="pvn-field"
    dense
    outlined
    v-model="triggerEvent"
    label="Trigger Event"
    :rules="[required()]"
  >
    <template v-slot:prepend>
      <q-icon name="img:src/assets/images/update_event.svg" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import { required } from 'src/common/utils/validations';

export default defineComponent({
  props: {
    details: {
      type: Object as PropType<WorkflowWidget>,
      required: true,
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const { getFieldModel } = useDetailsForm<WorkflowWidget>(props, emit);
    const triggerEvent = getFieldModel('event', '');

    return { triggerEvent, required };
  },
});
</script>
