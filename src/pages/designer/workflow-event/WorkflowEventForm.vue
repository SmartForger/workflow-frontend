<template>
  <q-card class="q-ma-sm q-pa-sm" bordered>
    <q-form @submit="save">
      <q-input
        class="pvn-field"
        dense
        outlined
        v-model="name"
        label="Event Name"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="text_fields" />
        </template>
      </q-input>

      <q-input
        class="pvn-field"
        dense
        outlined
        v-model="description"
        label="Description"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="text_fields" />
        </template>
      </q-input>

      <select-component v-model="target" :options="targetOptions" label="Target" icon="directions" />

      <div class="row q-mt-md">
        <q-btn class="q-mr-sm" type="submit" label="Save Event" icon="save" color="primary"></q-btn>
        <q-btn label="Cancel" @click="cancel()"></q-btn>
      </div>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { WorkflowStep } from 'src/common/types/WorkflowStep';
import { WorkflowEvent } from 'src/common/types/WorkflowEvent';
import SelectComponent from 'src/components/Select.vue';
import { required } from 'src/common/utils/validations';

export default defineComponent({
  components: { SelectComponent },
  props: {
    details: {
      type: Object as PropType<WorkflowEvent>,
      required: true,
    },
    steps: {
      type: Array as PropType<WorkflowStep[]>,
      default: () => [],
    },
    currentStepId: {
      type: String,
    },
  },
  emits: ['save', 'cancel', 'update'],
  setup(props, { emit }) {
    const { save, cancel, getFieldModel } = useDetailsForm<WorkflowEvent>(props, emit);

    const name = getFieldModel('name', '');
    const description = getFieldModel('description', '');
    const target = computed({
      get: () => props.details.target?.id || '',
      set: (targetId: string) => {
        const target = props.steps.find((step) => step.id === targetId);
        emit('update', {
          targetId,
          target,
        });
      },
    });
    const targetOptions = computed(() => {
      return props.steps
        .filter((step) => step.id !== props.currentStepId)
        .map((step) => ({
          value: step.id,
          label: step.name,
        }));
    });

    return {
      targetOptions,
      name,
      description,
      target,
      save,
      cancel,
      required,
    };
  },
});
</script>
