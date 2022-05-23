<template>
  <q-expansion-item :group="expansionGroup" dense v-model="open" @after-hide="cancel()">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="timeline" />
      </q-item-section>

      <q-item-section> Events ({{ state.context.list.length }}) </q-item-section>

      <q-item-section side>
        <q-btn flat round icon="add" @click.stop="add()"></q-btn>
      </q-item-section>
    </template>

    <div class="q-pa-sm" v-if="isListView">
      <div class="q-px-sm" v-if="!state.context.list.length">No events</div>
      <q-list bordered v-else>
        <draggable-list v-model="draggableList" handle=".handle" item-key="id">
          <template #item="{ element: ev }">
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon class="handle" name="drag_indicator"></q-icon>
              </q-item-section>
              <q-item-section side>
                <icon-renderer
                  icon="src/assets/images/event_blue.svg"
                  iconFileName="event_blue.svg"
                ></icon-renderer>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ ev.name }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="row">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="content_copy"
                    @click="duplicateItem(ev)"
                  ></q-btn>
                  <q-btn flat round size="sm" icon="edit" @click="editItem(ev)"></q-btn>
                  <q-btn flat round size="sm" icon="delete" @click="deleteItem(ev)"></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </draggable-list>
      </q-list>
    </div>

    <workflow-event-form
      :details="currentItem"
      :steps="steps"
      :currentStepId="stepId"
      @save="save"
      @cancel="cancel"
      @update="update"
      v-else
    ></workflow-event-form>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, ref } from 'vue';
import { useContextListSync } from 'src/common/composables/useContextListSync';
import { useListMachine } from 'src/common/composables/useListMachine';
import { WorkflowEvent } from 'src/common/types/WorkflowEvent';
import { WorkflowStep } from 'src/common/types/WorkflowStep';
import api from 'src/common/api';
import { cloneWorkflowEvent } from 'src/common/utils/clone';
import WorkflowEventForm from './WorkflowEventForm.vue';

export default defineComponent({
  components: {
    WorkflowEventForm,
  },
  props: {
    expansionGroup: {
      type: String,
      required: true,
    },
    events: {
      type: Array as PropType<WorkflowEvent[]>,
      default: () => [],
    },
    steps: {
      type: Array as PropType<WorkflowStep[]>,
      default: () => [],
    },
    stepId: {
      type: String,
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
      orderItems,
      save,
      cancel,
      update,
    } = useListMachine<WorkflowEvent>({
      id: 'worflowEvents',
      getListRequest: async () => props.events || [],
      createItemRequest: (event) => api.createWorkflowEvent({ ...event, stepId: props.stepId }),
      updateItemRequest: (event) => api.updateWorkflowEvent({ ...event, stepId: props.stepId }),
      orderItemsRequest: (orders) => api.updateWorkflowEventsOrder(orders, props.stepId),
      deleteItemRequest: api.deleteWorkflowEvent,
      cloneItem: cloneWorkflowEvent,
      onUpdate: inject('emitWorkflowUpdate'),
    });
    const { draggableList } = useContextListSync<WorkflowEvent>(state, emit, {
      onReorder: orderItems,
    });

    const open = ref(false);

    const add = () => {
      addItem();
      if (!open.value) {
        setTimeout(() => {
          open.value = true;
        }, 50);
      }
    };

    return {
      state,
      currentItem,
      isListView,
      draggableList,
      add,
      editItem,
      duplicateItem,
      save,
      cancel,
      update,
      open,
    };
  },
});
</script>
