<template>
  <q-card-section>
    <template v-if="state.matches('list')">
      <q-toolbar class="q-pb-none">
        <q-toolbar-title> Workflow Steps </q-toolbar-title>
        <q-space></q-space>
        <q-btn flat round icon="add" @click="send({ type: 'ADD' })" />
      </q-toolbar>
      <draggable
        v-model="steps"
        class="list-group"
        handle=".handle"
        item-key="id"
        v-if="state.context.list.length"
      >
        <template #item="{ element: step }">
          <q-item clickable v-ripple>
            <q-item-section side>
              <q-icon class="handle" name="drag_indicator"></q-icon>
            </q-item-section>

            <q-item-section side>
              <q-avatar square>
                <img :src="step.icon" />
              </q-avatar>
            </q-item-section>

            <q-item-section> {{ step.displayName }} </q-item-section>

            <q-item-section side>
              <q-icon
                name="edit"
                @click.prevent="send({ type: 'EDIT', item: step })"
              ></q-icon>
            </q-item-section>

            <q-item-section side>
              <q-icon
                name="delete"
                @click.prevent="send({ type: 'DELETE', item: step })"
              ></q-icon>
            </q-item-section>
          </q-item>
        </template>
      </draggable>
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
        @cancel="send({ type: 'BACK' })"
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
        @cancel="send({ type: 'BACK' })"
      ></workflow-step-settings>
    </template>
  </q-card-section>
</template>

<style scoped>
.list-group {
  border: 1px solid #aaa;
  border-radius: 5px;
  overflow: hidden;
}
</style>

<script lang="ts">
import { defineComponent, PropType, watch, computed } from 'vue';
import { useMachine } from '@xstate/vue';
import Draggable from 'vuedraggable';
import { createListViewMachine } from 'src/common/machines/list-view.machine';
import { WorkflowStep } from 'src/common/types/WorkflowStep';
import { Workflow } from 'src/common/types/Workflow';
import WorkflowStepSettings from './WorkflowStepSettings.vue';

const workflowStepsMachine =
  createListViewMachine<WorkflowStep>('workflow_steps');

export default defineComponent({
  name: 'WorkflowSteps',
  components: {
    Draggable,
    WorkflowStepSettings,
  },
  props: {
    workflow: {
      type: Object as PropType<Workflow>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { state, send } = useMachine(workflowStepsMachine, { devTools: true });

    const steps = computed({
      get: () => state.value.context.list,
      set: (val) => send({ type: 'SET_LIST', list: val }),
    });

    send({ type: 'SET_LIST', list: [...props.workflow.steps] });

    watch(
      () => state.value.context.list,
      (newVal) => {
        emit('update:steps', newVal);
      }
    );

    return { state, send, steps };
  },
});
</script>
