<template>
  <q-card-section class="q-px-none">
    <template
      v-if="state.matches('list') || state.matches('listRequest') || state.matches('deleteRequest')"
    >
      <q-toolbar class="q-pb-none">
        <q-toolbar-title> Workflow Steps </q-toolbar-title>
        <q-space></q-space>
        <q-btn flat round icon="add" @click="addItem()" />
      </q-toolbar>
      <draggable
        v-model="steps"
        class="pvn-draggable-list"
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
              <q-img :src="step.icon" width="40px" height="40px" />
            </q-item-section>

            <q-item-section> {{ step.name }} </q-item-section>

            <q-item-section side>
              <div class="row">
                <q-btn icon="edit" flat round size="sm" @click.prevent="editItem(step)"></q-btn>
                <q-btn icon="delete" flat round size="sm" @click.prevent="deleteItem(step)"></q-btn>
              </div>
            </q-item-section>
          </q-item>
        </template>
      </draggable>
      <q-banner class="bg-grey-3" dense v-if="!state.context.list.length">
        No steps added.
      </q-banner>
    </template>

    <workflow-step-form
      :editing="state.matches('editing')"
      :details="currentItem"
      :steps="steps"
      @save="save"
      @cancel="cancel"
      @update="update"
      v-else
    ></workflow-step-form>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Draggable from 'vuedraggable';
import { useContextListSync } from 'src/common/composables/useContextListSync';
import { useListMachine } from 'src/common/composables/useListMachine';
import { WorkflowStep } from 'src/common/types/WorkflowStep';
import { Workflow } from 'src/common/types/Workflow';
import api from 'src/common/api';
import WorkflowStepForm from './WorkflowStepForm.vue';

export default defineComponent({
  name: 'WorkflowSteps',
  components: {
    Draggable,
    WorkflowStepForm,
  },
  props: {
    workflow: {
      type: Object as PropType<Workflow>,
      required: true,
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const { state, currentItem, addItem, editItem, deleteItem, save, cancel, update, setList } =
      useListMachine<WorkflowStep>({
        id: 'worflowSteps',
        getListRequest: async () => props.workflow.steps || [],
        createItemRequest: (data) =>
          api.createWorkflowStep({ ...data, workflowId: props.workflow.id }),
        updateItemRequest: (data) =>
          api.updateWorkflowStep({ ...data, workflowId: props.workflow.id }),
        deleteItemRequest: api.deleteWorkflowStep,
      });
    const steps = useContextListSync<WorkflowStep>(state, setList, emit);

    return {
      state,
      steps,
      currentItem,
      addItem,
      editItem,
      deleteItem,
      save,
      cancel,
      update,
    };
  },
});
</script>