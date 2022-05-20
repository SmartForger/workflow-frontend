<template>
  <q-expansion-item :group="expansionGroup" dense>
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="img:src/assets/images/widgets.svg" />
      </q-item-section>

      <q-item-section> Widgets ({{ state.context.list.length }}) </q-item-section>

      <q-item-section side>
        <q-btn flat round icon="add" @click.stop="openAddModal($event)"></q-btn>
      </q-item-section>
    </template>

    <div class="q-pa-sm">
      <div class="q-px-sm" v-if="!state.context.list.length">No widgets</div>
      <q-list bordered v-else>
        <draggable v-model="draggableList" handle=".handle" item-key="id">
          <template #item="{ element: widget }">
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon class="handle" name="drag_indicator"></q-icon>
              </q-item-section>
              <q-item-section side v-if="widget.icon">
                <icon-renderer
                  :icon="widget.icon"
                  :iconFileName="widget.iconFileName"
                ></icon-renderer>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ widget.name }}</q-item-label>
                <div>
                  <q-badge class="bg-green text-white">
                    {{ widget.type }}
                  </q-badge>
                </div>
              </q-item-section>

              <q-item-section side>
                <div class="row">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="content_copy"
                    @click="duplicateItem(widget)"
                  ></q-btn>
                  <q-btn flat round size="sm" icon="edit" @click="openEditModal(widget)"></q-btn>
                  <q-btn flat round size="sm" icon="delete" @click="deleteItem(widget)"></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </draggable>
      </q-list>
    </div>

    <q-dialog :model-value="currentItem && modalOpen">
      <div class="bg-white dialog">
        <prodeo-widget-settings
          :details="currentItem"
          @save="save"
          @cancel="closeModal"
          @update="update"
        />
      </div>
    </q-dialog>
  </q-expansion-item>
</template>

<style scoped>
.dialog {
  min-width: 640px;
}
</style>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';
import Draggable from 'vuedraggable';
import { useContextListSync } from 'src/common/composables/useContextListSync';
import { useListMachine } from 'src/common/composables/useListMachine';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import api from 'src/common/api';
// import WorkflowWidgetForm from './WorkflowWidgetForm.vue';
import { cloneEntity } from 'src/common/utils/clone';

export default defineComponent({
  components: {
    Draggable,
    // WorkflowWidgetForm,
  },
  props: {
    expansionGroup: {
      type: String,
      required: true,
    },
    widgets: {
      type: Array as PropType<WorkflowWidget[]>,
      default: () => [],
    },
    stepId: String,
    layoutId: String,
  },
  emits: ['update'],
  setup(props, { emit }) {
    const {
      state,
      currentItem,
      isListView,
      duplicateItem,
      deleteItem,
      orderItems,
      save,
      update,
      modalOpen,
      openAddModal,
      openEditModal,
      closeModal,
    } = useListMachine<WorkflowWidget>({
      id: 'worflowWidgets',
      getListRequest: async () => props.widgets || [],
      createItemRequest: (widget) =>
        api.createWorkflowWidget({
          ...widget,
          stepId: props.stepId,
          layoutId: props.layoutId,
        }),
      updateItemRequest: (widget) =>
        api.updateWorkflowWidget({
          ...widget,
          stepId: props.stepId,
          layoutId: props.layoutId,
        }),
      deleteItemRequest: api.deleteWorkflowWidget,
      orderItemsRequest: (orders) =>
        api.updateWorkflowWidgetsOrder(orders, props.stepId || props.layoutId || ''),
      cloneItem: cloneEntity,
      onUpdate: inject('emitWorkflowUpdate'),
      updateWhen: {
        reorder: true,
      },
    });
    const { draggableList } = useContextListSync<WorkflowWidget>(state, emit, {
      onReorder: orderItems,
    });

    return {
      state,
      isListView,
      currentItem,
      draggableList,
      modalOpen,
      openAddModal,
      openEditModal,
      closeModal,
      duplicateItem,
      deleteItem,
      save,
      update,
    };
  },
});
</script>
