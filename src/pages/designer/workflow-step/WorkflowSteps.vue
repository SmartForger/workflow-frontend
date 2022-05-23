<template>
  <q-card-section class="q-px-none">
    <template v-if="isListView">
      <q-toolbar class="q-pb-none">
        <q-toolbar-title> Workflow Steps </q-toolbar-title>
        <q-space></q-space>
        <q-btn flat round icon="add" @click="addItem()" />
      </q-toolbar>
      <draggable-list
        v-model="draggableList"
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

            <q-item-section side v-if="step.icon">
              <icon-renderer :icon="step.icon" :iconFileName="step.iconFileName"></icon-renderer>
            </q-item-section>

            <q-item-section class="text-bold text-grey-9"> {{ step.name }} </q-item-section>

            <q-item-section side>
              <div class="row">
                <q-btn
                  flat
                  round
                  size="sm"
                  icon="content_copy"
                  @click="duplicateItem(step)"
                ></q-btn>
                <q-btn icon="edit" flat round size="sm" @click.prevent="editItem(step)"></q-btn>
                <q-btn icon="delete" flat round size="sm" @click.prevent="deleteItem(step)"></q-btn>
              </div>
            </q-item-section>
          </q-item>
        </template>
      </draggable-list>
      <q-banner class="bg-grey-3" dense v-if="!state.context.list.length">
        No steps added.
      </q-banner>
    </template>

    <workflow-step-form
      :editing="state.matches('editing')"
      :details="currentItem"
      :steps="draggableList"
      @save="save"
      @cancel="cancel"
      @update="update"
      v-else
    ></workflow-step-form>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';
import { useContextListSync } from 'src/common/composables/useContextListSync';
import { useListMachine } from 'src/common/composables/useListMachine';
import { WorkflowStep } from 'src/common/types/WorkflowStep';
import { Workflow } from 'src/common/types/Workflow';
import api from 'src/common/api';
import WorkflowStepForm from './WorkflowStepForm.vue';
import { cloneWorkflowStep } from 'src/common/utils/clone';

export default defineComponent({
  name: 'WorkflowSteps',
  components: {
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
    const {
      state,
      currentItem,
      isListView,
      addItem,
      editItem,
      duplicateItem,
      deleteItem,
      orderItems,
      save,
      cancel,
      update,
    } = useListMachine<WorkflowStep>({
      id: 'worflowSteps',
      getListRequest: async () => props.workflow.steps || [],
      createItemRequest: (data) =>
        api.createWorkflowStep({ ...data, workflowId: props.workflow.id }),
      updateItemRequest: (data) =>
        api.updateWorkflowStep({ ...data, workflowId: props.workflow.id }),
      deleteItemRequest: api.deleteWorkflowStep,
      orderItemsRequest: (orders) => api.updateWorkflowStepsOrder(orders, props.workflow.id),
      cloneItem: cloneWorkflowStep,
      onUpdate: inject('emitWorkflowUpdate'),
      updateWhen: {
        reorder: true,
      },
    });
    const { draggableList } = useContextListSync<WorkflowStep>(state, emit, {
      onReorder: orderItems,
    });

    return {
      state,
      draggableList,
      currentItem,
      isListView,
      addItem,
      editItem,
      duplicateItem,
      deleteItem,
      save,
      cancel,
      update,
    };
  },
});
</script>
