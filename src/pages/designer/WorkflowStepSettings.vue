<template>
  <q-toolbar class="q-px-none">
    <q-btn flat round icon="arrow_back" @click="cancel()" />
    <q-toolbar-title>
      {{ editing ? 'Edit Workflow Step' : 'Add Workflow Step' }}
    </q-toolbar-title>
  </q-toolbar>
  <q-form @submit="save">
    <q-input
      class="pvn-field"
      dense
      outlined
      label="Step Name"
      placeholder="Enter step name"
      v-model="displayName"
      :rules="[required()]"
    >
      <template v-slot:prepend>
        <q-icon name="img:src/assets/images/input_text.svg" />
      </template>
    </q-input>

    <q-input
      class="pvn-field"
      type="textarea"
      rows="2"
      dense
      outlined
      v-model="description"
      label="Step Description"
      placeholder="Enter step description"
      :rules="[required()]"
    >
      <template v-slot:prepend>
        <q-icon name="img:src/assets/images/input_text.svg" />
      </template>
    </q-input>

    <q-file
      class="pvn-field"
      color="teal"
      outlined
      dense
      label="Select Step Icon"
      v-model="iconFile"
      :rules="[required()]"
    >
      <template v-slot:prepend>
        <q-icon name="image" />
      </template>
      <template v-slot:append>
        <q-avatar square v-if="details.icon">
          <img :src="details.icon" />
        </q-avatar>
      </template>
    </q-file>

    <q-list bordered>
      <workflow-step-widgets
        expansionGroup="step"
        :widgets="details.widgets"
        @update="update('widgets', $event)"
      ></workflow-step-widgets>
      <workflow-step-events></workflow-step-events>
      <workflow-step-layouts
        expansionGroup="step"
        :layouts="details.layouts"
        @update="update('layouts', $event)"
      ></workflow-step-layouts>
    </q-list>

    <div class="row q-mt-md">
      <q-btn
        class="q-mr-sm"
        type="submit"
        label="Save"
        icon="save"
        color="primary"
      ></q-btn>
      <q-btn label="Cancel" @click="cancel()"></q-btn>
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { WorkflowStep } from 'src/common/types/WorkflowStep';
import { required } from 'src/common/utils/validations';
import WorkflowStepWidgets from './WorkflowStepWidgets.vue';
import WorkflowStepEvents from './WorkflowStepEvents.vue';
import WorkflowStepLayouts from './WorkflowStepLayouts.vue';

export default defineComponent({
  components: {
    WorkflowStepWidgets,
    WorkflowStepEvents,
    WorkflowStepLayouts,
  },
  props: {
    editing: Boolean,
    details: {
      type: Object as PropType<WorkflowStep>,
      required: true,
    },
  },
  emits: ['save', 'cancel', 'update'],
  setup(props, { emit }) {
    const { save, cancel, update, getFieldModel, getIconFileModel } =
      useDetailsForm<WorkflowStep>(props, emit);

    const displayName = getFieldModel('displayName');
    const description = getFieldModel('description');
    const iconFile = getIconFileModel('iconFileName', 'icon');

    return {
      displayName,
      description,
      iconFile,
      save,
      cancel,
      update,
      required,
    };
  },
});
</script>
