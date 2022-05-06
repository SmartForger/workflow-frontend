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

      <q-select
        class="pvn-field"
        dense
        outlined
        label="Target Step"
        v-model="step"
        :options="steps"
        option-value="id"
        option-label="displayName"
        :display-value="stepName"
        emit-value
      >
        <template v-slot:prepend>
          <q-icon name="directions" />
        </template>
      </q-select>

      <q-select
        class="pvn-field"
        dense
        outlined
        label="Actions"
        v-model="action"
        :options="eventActions"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="directions" />
        </template>
      </q-select>

      <q-input
        class="pvn-field"
        dense
        outlined
        label="Condition"
        v-model="condition"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="compare_arrows" />
        </template>
      </q-input>

      <div class="row q-mt-md">
        <q-btn
          class="q-mr-sm"
          type="submit"
          label="Save Event"
          icon="save"
          color="primary"
        ></q-btn>
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
import { eventActions } from '../constants';

export default defineComponent({
  props: {
    details: {
      type: Object as PropType<WorkflowEvent>,
      required: true,
    },
    steps: {
      type: Array as PropType<WorkflowStep[]>,
      default: () => [],
    },
  },
  emits: ['save', 'cancel', 'update'],
  setup(props, { emit }) {
    console.log(111, props.details);

    const { save, cancel, getFieldModel } = useDetailsForm<WorkflowEvent>(
      props,
      emit
    );

    const name = getFieldModel('name', '');
    const description = getFieldModel('description', '');

    return {
      eventActions,
      name,
      description,
      save,
      cancel,
      required,
    };
  },
});
</script>
