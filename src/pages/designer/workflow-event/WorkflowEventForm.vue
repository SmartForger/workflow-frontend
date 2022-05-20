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

      <q-input class="pvn-field" dense outlined v-model="description" label="Description">
        <template v-slot:prepend>
          <q-icon name="text_fields" />
        </template>
      </q-input>

      <select-component
        v-model="target"
        :options="targetOptions"
        label="Target"
        icon="directions"
      />

      <q-list bordered>
        <workflow-event-actions
          expansionGroup="action"
          :actions="details.actions"
          :eventId="details.id"
          @update="update('actions', $event)"
        ></workflow-event-actions>
        <workflow-event-conditions
          expansionGroup="condition"
          :conditions="details.conditions"
          :eventId="details.id"
          @update="update('conditions', $event)"
        ></workflow-event-conditions>
      </q-list>

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
import { required } from 'src/common/utils/validations';
import WorkflowEventConditions from '../workflow-event-condition/WorkflowEventConditions.vue';
import WorkflowEventActions from '../workflow-event-action/WorkflowEventActions.vue';

export default defineComponent({
  components: { WorkflowEventConditions, WorkflowEventActions },
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
    const { save, cancel, update, getFieldModel } = useDetailsForm<WorkflowEvent>(props, emit);

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
      update,
      required,
    };
  },
});
</script>
