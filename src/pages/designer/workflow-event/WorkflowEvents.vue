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

    <div
      class="q-pa-sm"
      v-if="state.matches('list') || state.matches('listRequest') || state.matches('deleteRequest')"
    >
      <div class="q-px-sm" v-if="!state.context.list.length">No events</div>
      <q-list bordered v-else>
        <draggable v-model="list" handle=".handle" item-key="id">
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
                  <q-btn flat round size="sm" icon="edit" @click="editItem(ev)"></q-btn>
                  <q-btn flat round size="sm" icon="delete" @click="deleteItem(ev)"></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </draggable>
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
import Draggable from 'vuedraggable';
import { useContextListSync } from 'src/common/composables/useContextListSync';
import { useListMachine } from 'src/common/composables/useListMachine';
import { WorkflowEvent } from 'src/common/types/WorkflowEvent';
import { WorkflowStep } from 'src/common/types/WorkflowStep';
import api from 'src/common/api';
import WorkflowEventForm from './WorkflowEventForm.vue';

export default defineComponent({
  components: {
    Draggable,
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
    const { state, currentItem, addItem, editItem, save, cancel, update, setList } =
      useListMachine<WorkflowEvent>({
        id: 'worflowEvents',
        getListRequest: async () => props.events || [],
        createItemRequest: (event) => api.createWorkflowEvent({ ...event, stepId: props.stepId }),
        updateItemRequest: (event) => api.updateWorkflowEvent({ ...event, stepId: props.stepId }),
        deleteItemRequest: api.deleteWorkflowEvent,
        onUpdate: inject('emitWorkflowUpdate'),
      });
    const list = useContextListSync<WorkflowEvent>(state, setList, emit);

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
      list,
      add,
      editItem,
      save,
      cancel,
      update,
      setList,
      open,
    };
  },
});
</script>
