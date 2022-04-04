<template>
  <q-card-section class="q-pa-md">
    <template v-if="state.matches('list')">
      <q-toolbar class="q-pb-xs">
        <q-toolbar-title> Workflow Steps </q-toolbar-title>
        <q-space></q-space>
        <q-btn flat round icon="add" @click="send({ type: 'ADD' })" />
      </q-toolbar>
      <q-list bordered class="rounded-borders" v-if="state.context.list.length">
        <workflow-step-item
          :key="step.id"
          :details="step"
          @edit="send({ type: 'EDIT', item: step })"
          @delete="send({ type: 'DELETE', item: step })"
          v-for="step in state.context.list"
        ></workflow-step-item>
      </q-list>
      <q-banner class="bg-grey-3" dense v-if="!state.context.list.length">
        No steps added.
      </q-banner>
    </template>
    <template v-if="state.matches('add')">
      <q-toolbar class="q-pb-xs" v-if="!state.matches('list')">
        <q-btn flat round icon="arrow_back" @click="send({ type: 'BACK' })" />
        <q-toolbar-title> Add Workflow Step </q-toolbar-title>
      </q-toolbar>
      <workflow-step-settings
        @save="send({ type: 'SAVE', item: $event })"
      ></workflow-step-settings>
    </template>
    <template v-if="state.matches('edit')">
      <q-toolbar class="q-pb-xs" v-if="!state.matches('list')">
        <q-btn flat round icon="arrow_back" @click="send({ type: 'BACK' })" />
        <q-toolbar-title> Edit Workflow Step </q-toolbar-title>
      </q-toolbar>
      <workflow-step-settings
        :details="state.context.selected"
        @save="send({ type: 'SAVE', item: $event })"
      ></workflow-step-settings>
    </template>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMachine } from '@xstate/vue';
import { createListViewMachine } from 'src/common/machines/list-view.machine';
import { WorkflowStep } from 'src/common/types/WorkflowStep';
import { workflowSteps } from './constants';
import WorkflowStepItem from './WorkflowStepItem.vue';
import WorkflowStepSettings from './WorkflowStepSettings.vue';

const workflowStepsMachine =
  createListViewMachine<WorkflowStep>('workflow_steps');

export default defineComponent({
  name: 'WorkflowSteps',
  components: {
    WorkflowStepItem,
    WorkflowStepSettings,
  },
  setup() {
    const { state, send } = useMachine(workflowStepsMachine);

    send({ type: 'SET_LIST', list: workflowSteps });

    return { state, send };
  },
});
</script>
