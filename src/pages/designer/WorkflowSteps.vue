<template>
  <q-card-section class="q-px-none">
    <template
      v-if="
        state.matches('list') ||
        state.matches('listRequest') ||
        state.matches('deleteRequest')
      "
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
              <q-avatar square>
                <img :src="step.icon" />
              </q-avatar>
            </q-item-section>

            <q-item-section> {{ step.displayName }} </q-item-section>

            <q-item-section side>
              <div class="row">
                <q-btn
                  icon="edit"
                  flat
                  round
                  size="sm"
                  @click.prevent="editItem(step)"
                ></q-btn>
                <q-btn
                  icon="delete"
                  flat
                  round
                  size="sm"
                  @click.prevent="deleteItem(step)"
                ></q-btn>
              </div>
            </q-item-section>
          </q-item>
        </template>
      </draggable>
      <q-banner class="bg-grey-3" dense v-if="!state.context.list.length">
        No steps added.
      </q-banner>
    </template>

    <workflow-step-settings
      :editing="state.matches('editing')"
      :details="state.context.current"
      :steps="steps"
      @save="save"
      @cancel="cancel"
      @update="update"
      v-else
    ></workflow-step-settings>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { v4 as uuid } from 'uuid';
import Draggable from 'vuedraggable';
import { useContextListSync } from 'src/common/composables/useContextListSync';
import { useListMachine } from 'src/common/composables/useListMachine';
import { WorkflowStep } from 'src/common/types/WorkflowStep';
import { Workflow } from 'src/common/types/Workflow';
import api from 'src/common/api';
import WorkflowStepSettings from './WorkflowStepSettings.vue';

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
  emits: ['update'],
  setup(props, { emit }) {
    const {
      state,
      addItem,
      editItem,
      deleteItem,
      save,
      cancel,
      update,
      setList,
    } = useListMachine<WorkflowStep>({
      id: 'worflowSteps',
      createEmptyItem: () => ({
        id: uuid(),
        name: '',
        displayName: '',
        description: '',
        icon: '',
        iconFileName: '',
        widgets: [],
        events: [],
        layouts: [],
        workflowId: props.workflow.id,
      }),
      getListRequest: async () => props.workflow.steps,
      createItemRequest: (data) =>
        api.createWorkflowStep({ ...data, workflowId: props.workflow.id }),
      updateItemRequest: (data) =>
        api.updateWorkflowStep({ ...data, workflowId: props.workflow.id }),
      deleteItemRequest: api.deleteWorkflowStep,
    });
    const steps = useContextListSync<WorkflowStep>(state, setList, emit);

    setList([...props.workflow.steps]);

    return {
      state,
      steps,
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
