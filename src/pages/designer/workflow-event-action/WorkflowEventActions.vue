<template>
  <q-expansion-item :group="expansionGroup" dense v-model="open" @after-hide="cancel()">
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="timeline" />
      </q-item-section>

      <q-item-section> Actions ({{ state.context.list.length }}) </q-item-section>

      <q-item-section side>
        <q-btn flat round icon="add" @click.stop="add()"></q-btn>
      </q-item-section>
    </template>

    <div class="q-pa-sm" v-if="isListView">
      <div class="q-px-sm" v-if="!state.context.list.length">No actions</div>
      <q-list bordered v-else>
        <draggable-list v-model="draggableList" handle=".handle-condition" item-key="id">
          <template #item="{ element: action }">
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon class="handle-condition" name="drag_indicator"></q-icon>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ action.info.name }}</q-item-label>
                <div>
                  <q-chip color="green" dense>{{ action.info?.type }}</q-chip>
                  <q-chip dense :key="component" v-for="component in action.info.components">
                    {{ component }}
                  </q-chip>
                  <q-chip dense v-if="!action.info.components?.length">General</q-chip>
                </div>
              </q-item-section>

              <q-item-section side>
                <div class="row">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="content_copy"
                    @click="duplicateItem(action)"
                  ></q-btn>
                  <q-btn flat round size="sm" icon="edit" @click="editItem(action)"></q-btn>
                  <q-btn flat round size="sm" icon="delete" @click="deleteItem(action)"></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </draggable-list>
      </q-list>
    </div>

    <workflow-event-action-form
      :details="currentItem"
      :eventId="eventId"
      @save="save"
      @cancel="cancel"
      @update="update"
      v-else
    ></workflow-event-action-form>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, ref } from 'vue';
import { useContextListSync } from 'src/common/composables/useContextListSync';
import { useListMachine } from 'src/common/composables/useListMachine';
import { WorkflowEventAction } from 'src/common/types/WorkflowEventAction';
import api from 'src/common/api';
import WorkflowEventActionForm from './WorkflowEventActionForm.vue';
import { cloneEntity } from 'src/common/utils/clone';

export default defineComponent({
  components: {
    WorkflowEventActionForm,
  },
  props: {
    expansionGroup: {
      type: String,
      required: true,
    },
    actions: {
      type: Array as PropType<WorkflowEventAction[]>,
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
      deleteItem,
      orderItems,
      save,
      cancel,
      update,
    } = useListMachine<WorkflowEventAction>({
      id: 'worflowEventActions',
      getListRequest: async () => props.actions || [],
      createItemRequest: (action) =>
        api.createWorkflowEventAction({ ...action, eventId: props.eventId }),
      updateItemRequest: (action) =>
        api.updateWorkflowEventAction({ ...action, eventId: props.eventId }),
      deleteItemRequest: api.deleteWorkflowEventAction,
      cloneItem: cloneEntity,
      orderItemsRequest: (orders) => api.updateWorkflowEventActionsOrder(orders, props.eventId),
      onUpdate: inject('emitWorkflowUpdate'),
    });
    const { draggableList } = useContextListSync<WorkflowEventAction>(state, emit, {
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
      save,
      cancel,
      update,
      deleteItem,
      open,
    };
  },
});
</script>
