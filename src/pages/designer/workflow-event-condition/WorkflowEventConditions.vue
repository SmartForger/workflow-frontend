<template>
  <q-expansion-item :group="expansionGroup" dense v-model="open" @after-hide="cancel()">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="timeline" />
      </q-item-section>

      <q-item-section> Conditions ({{ state.context.list.length }}) </q-item-section>

      <q-item-section side>
        <q-btn flat round icon="add" @click.stop="add()"></q-btn>
      </q-item-section>
    </template>

    <div
      class="q-pa-sm"
      v-if="state.matches('list') || state.matches('listRequest') || state.matches('deleteRequest')"
    >
      <div class="q-px-sm" v-if="!state.context.list.length">No conditions</div>
      <q-list bordered v-else>
        <draggable v-model="list" handle=".handle-condition" item-key="id">
          <template #item="{ element: ev }">
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon class="handle-condition" name="drag_indicator"></q-icon>
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

    <workflow-event-condition-form
      :details="currentItem"
      :eventId="eventId"
      @save="save"
      @cancel="cancel"
      @update="update"
      v-else
    ></workflow-event-condition-form>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import Draggable from 'vuedraggable';
import { useContextListSync } from 'src/common/composables/useContextListSync';
import { useListMachine } from 'src/common/composables/useListMachine';
import { WorkflowEventCondition } from 'src/common/types/WorkflowEventCondition';
import api from 'src/common/api';
import WorkflowEventConditionForm from './WorkflowEventConditionForm.vue';

export default defineComponent({
  components: {
    Draggable,
    WorkflowEventConditionForm,
  },
  props: {
    expansionGroup: {
      type: String,
      required: true,
    },
    conditions: {
      type: Array as PropType<WorkflowEventCondition[]>,
      default: () => [],
    },
    eventId: {
      type: String,
      required: true,
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const { state, currentItem, addItem, editItem, save, cancel, update, setList } =
      useListMachine<WorkflowEventCondition>({
        id: 'worflowEventConditions',
        getListRequest: async () => props.conditions || [],
        createItemRequest: (condition) =>
          api.createWorkflowEventCondition({ ...condition, eventId: props.eventId }),
        updateItemRequest: (condition) =>
          api.updateWorkflowEventCondition({ ...condition, eventId: props.eventId }),
        deleteItemRequest: api.deleteWorkflowEventCondition,
      });
    const list = useContextListSync<WorkflowEventCondition>(state, setList, emit);

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
      list,
      currentItem,
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