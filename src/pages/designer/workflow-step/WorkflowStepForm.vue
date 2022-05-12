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
      v-model="name"
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
    >
      <template v-slot:prepend>
        <q-icon name="img:src/assets/images/input_text.svg" />
      </template>
    </q-input>

    <file-uploader label="Icon" field-icon="image" v-model="icon"></file-uploader>

    <q-list bordered>
      <workflow-widgets
        expansionGroup="step"
        :widgets="details.widgets"
        :stepId="details.id"
        @update="update('widgets', $event)"
      ></workflow-widgets>
      <workflow-events
        expansionGroup="step"
        :events="details.events"
        :steps="steps"
        :stepId="details.id"
        @update="update('events', $event)"
      ></workflow-events>
      <workflow-layouts
        expansionGroup="step"
        :layouts="details.layouts"
        :stepId="details.id"
        @update="update('layouts', $event)"
      ></workflow-layouts>
    </q-list>

    <div class="row q-mt-md">
      <q-btn class="q-mr-sm" type="submit" label="Save Step" icon="save" color="primary"></q-btn>
      <q-btn label="Cancel" @click="cancel()"></q-btn>
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { WorkflowStep } from 'src/common/types/WorkflowStep';
import FileUploader from 'src/components/FileUploader.vue';
import { required, arrayRequired } from 'src/common/utils/validations';
import WorkflowWidgets from '../workflow-widget/WorkflowWidgets.vue';
import WorkflowEvents from '../workflow-event/WorkflowEvents.vue';
import WorkflowLayouts from '../workflow-layout/WorkflowLayouts.vue';

export default defineComponent({
  components: {
    WorkflowWidgets,
    WorkflowEvents,
    WorkflowLayouts,
    FileUploader,
  },
  props: {
    editing: Boolean,
    details: {
      type: Object as PropType<WorkflowStep>,
      required: true,
    },
    steps: {
      type: Array as PropType<WorkflowStep[]>,
      default: () => [],
    },
  },
  emits: ['save', 'cancel', 'update'],
  setup(props, { emit }) {
    const { save, cancel, update, getFieldModel, getIconModel } = useDetailsForm<WorkflowStep>(
      props,
      emit
    );

    const name = getFieldModel('name', '');
    const description = getFieldModel('description', '');
    const icon = getIconModel();

    return {
      name,
      description,
      icon,
      save,
      cancel,
      update,
      required,
      arrayRequired,
    };
  },
});
</script>
