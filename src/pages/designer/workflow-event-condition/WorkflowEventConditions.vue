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

    <div class="q-pa-sm" v-if="isListView">
      <div class="q-px-sm" v-if="!state.context.list.length">No conditions</div>
      <q-list bordered v-else>
        <draggable v-model="draggableList" handle=".handle-condition" item-key="id">
          <template #item="{ element: condition }">
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon class="handle-condition" name="drag_indicator"></q-icon>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ condition.name }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="row">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="content_copy"
                    @click="duplicateItem(condition)"
                  ></q-btn>
                  <q-btn flat round size="sm" icon="edit" @click="editItem(condition)"></q-btn>
                  <q-btn flat round size="sm" icon="delete" @click="deleteItem(condition)"></q-btn>
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
import { defineComponent, inject, PropType, ref } from 'vue';
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
    const {
      state,
      currentItem,
      isListView,
      addItem,
      editItem,
      duplicateItem,
      orderItems,
      deleteItem,
      save,
      cancel,
      update,
    } = useListMachine<WorkflowEventCondition>({
      id: 'worflowEventConditions',
      getListRequest: async () => props.conditions || [],
      createItemRequest: (condition) =>
        api.createWorkflowEventCondition({ ...condition, eventId: props.eventId }),
      updateItemRequest: (condition) =>
        api.updateWorkflowEventCondition({ ...condition, eventId: props.eventId }),
      deleteItemRequest: api.deleteWorkflowEventCondition,
      orderItemsRequest: (orders) => api.updateWorkflowEventConditionsOrder(orders, props.eventId),
      onUpdate: inject('emitWorkflowUpdate'),
    });
    const { draggableList } = useContextListSync<WorkflowEventCondition>(state, emit, {
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
      isListView,
      currentItem,
      draggableList,
      add,
      editItem,
      duplicateItem,
      deleteItem,
      save,
      cancel,
      update,
      open,
    };
  },
});
</script>
