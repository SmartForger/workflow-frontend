<template>
  <q-card-section>
    <q-select
      class="q-pb-xs"
      dense
      outlined
      v-model="category"
      :options="workflowCategories"
      label="Category"
    >
      <template v-slot:prepend>
        <q-icon name="business" />
      </template>
    </q-select>
    <q-select
      class="q-pb-xs"
      dense
      outlined
      v-model="subcategory"
      :options="workflowVerticals"
      label="Sub Category"
    >
      <template v-slot:prepend>
        <q-icon name="category" />
      </template>
    </q-select>
    <q-input
      class="q-pb-xs"
      dense
      outlined
      v-model="name"
      label="Workflow Name"
      placeholder="Workflow name"
    >
      <template v-slot:prepend>
        <q-icon name="text_fields" />
      </template>
    </q-input>
    <q-input
      class="q-pb-xs"
      type="textarea"
      rows="2"
      dense
      outlined
      v-model="description"
      label="Description"
      placeholder="Description"
    >
      <template v-slot:prepend>
        <q-icon name="text_fields" />
      </template>
    </q-input>
    <q-select
      class="q-pb-xs"
      dense
      use-input
      use-chips
      outlined
      multiple
      v-model="mode"
      :options="workflowModes"
      label="Mode"
    >
      <template v-slot:prepend>
        <q-icon name="img:src/assets/images/mode.svg" />
      </template>
    </q-select>

    <q-file
      dense
      class="q-pb-xs"
      color="teal"
      outlined
      v-model="icon"
      label="Select Workflow Icon"
    >
      <template v-slot:prepend>
        <q-icon name="image" />
      </template>

      <template v-slot:append>
        <q-avatar>
          <q-icon size="35px" :name="icon"></q-icon>
        </q-avatar>
      </template>
    </q-file>
  </q-card-section>

  <q-card-section class="q-pa-md">
    <q-toolbar class="q-pb-xs">
      <q-toolbar-title> Workflow Steps </q-toolbar-title>
      <q-space></q-space>
      <q-btn
        flat
        round
        icon="expand_less"
        @click="showList()"
        v-if="selectedStep"
      />
      <q-btn flat round icon="add" @click="addStep()" />
    </q-toolbar>
    <q-list bordered class="rounded-borders" v-if="!selectedStep">
      <workflow-step-item
        :key="step.id"
        :details="step"
        @edit="editStep($event)"
        @delete="deleteStep($event)"
        v-for="step in steps"
      ></workflow-step-item>
    </q-list>
    <workflow-step-settings :details="selectedStep" v-if="selectedStep">
    </workflow-step-settings>
  </q-card-section>
</template>

<script lang="ts">
import { WorkflowStep } from 'src/common/types/WorkflowStep';
import { defineComponent, ref } from 'vue';
import {
  workflowCategories,
  workflowVerticals,
  workflowModes,
  workflowSteps,
} from './constants';
import WorkflowStepItem from './WorkflowStepItem.vue';
import WorkflowStepSettings from './WorkflowStepSettings.vue';

export default defineComponent({
  components: { WorkflowStepItem, WorkflowStepSettings },
  setup() {
    const category = ref('');
    const subcategory = ref('');
    const name = ref('');
    const description = ref('');
    const mode = ref<string[]>([]);
    const icon = ref('');
    const steps = ref(workflowSteps);

    const selectedStep = ref<WorkflowStep>();

    const addStep = () => {
      selectedStep.value = {
        id: steps.value[steps.value.length - 1].id + 1,
        name: '',
        displayName: '',
        description: '',
        icon: '',
      };
    };

    const editStep = (details: WorkflowStep) => {
      console.log(111, details);
      selectedStep.value = details;
    };

    const deleteStep = (details: WorkflowStep) => {
      steps.value = steps.value.filter((step) => step.id !== details.id);
    };

    const showList = () => {
      selectedStep.value = undefined;
    };

    return {
      workflowCategories,
      workflowVerticals,
      steps,
      workflowModes,
      category,
      subcategory,
      name,
      description,
      mode,
      icon,
      selectedStep,
      addStep,
      editStep,
      deleteStep,
      showList,
    };
  },
});
</script>
