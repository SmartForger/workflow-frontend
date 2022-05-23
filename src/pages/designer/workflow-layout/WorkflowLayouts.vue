<template>
  <q-expansion-item
    class="q-py-sm"
    :group="expansionGroup"
    dense
    expand-separator
    v-model="open"
    @after-hide="cancel()"
  >
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="img:src/assets/images/layout.svg" />
      </q-item-section>

      <q-item-section> Layouts ({{ state.context.list.length }}) </q-item-section>

      <q-item-section side>
        <q-btn flat round icon="add" @click.stop="add()"></q-btn>
      </q-item-section>
    </template>

    <div class="q-pa-sm" v-if="isListView">
      <div class="q-px-sm" v-if="!state.context.list.length">No layouts</div>
      <q-list bordered v-else>
        <draggable-list v-model="draggableList" handle=".handle" item-key="id">
          <template #item="{ element: layout }">
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon class="handle" name="drag_indicator"></q-icon>
              </q-item-section>
              <q-item-section side v-if="layout.icon">
                <icon-renderer
                  :icon="layout.icon"
                  :iconFileName="layout.iconFileName"
                ></icon-renderer>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ layout.name }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="row">
                  <q-btn
                    flat
                    round
                    size="sm"
                    :icon="layout.visible ? 'visibility' : 'visibility_off'"
                    @click.stop="update({ id: layout.id, visible: !layout.visible })"
                  ></q-btn>
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="content_copy"
                    @click="duplicateItem(layout)"
                  ></q-btn>
                  <q-btn flat round size="sm" icon="edit" @click.stop="editItem(layout)"></q-btn>
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="delete"
                    @click.stop="deleteItem(layout)"
                  ></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </draggable-list>
      </q-list>
    </div>

    <workflow-layout-form
      :details="currentItem"
      @save="save"
      @cancel="cancel"
      @update="update"
      v-else
    ></workflow-layout-form>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, ref } from 'vue';
import { useContextListSync } from 'src/common/composables/useContextListSync';
import { useListMachine } from 'src/common/composables/useListMachine';
import { WorkflowLayout } from 'src/common/types/WorkflowLayout';
import api from 'src/common/api';
import WorkflowLayoutForm from './WorkflowLayoutForm.vue';
import { cloneWorkflowLayout } from 'src/common/utils/clone';

export default defineComponent({
  components: {
    WorkflowLayoutForm,
  },
  props: {
    expansionGroup: {
      type: String,
      required: true,
    },
    layouts: {
      type: Array as PropType<WorkflowLayout[]>,
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
      deleteItem,
      orderItems,
      save,
      cancel,
      update,
    } = useListMachine<WorkflowLayout>({
      id: 'worflowLayouts',
      getListRequest: async () => props.layouts || [],
      createItemRequest: (layout) => api.createWorkflowLayout({ ...layout, stepId: props.stepId }),
      updateItemRequest: (layout) => api.updateWorkflowLayout({ ...layout, stepId: props.stepId }),
      deleteItemRequest: api.deleteWorkflowLayout,
      orderItemsRequest: (orders) => api.updateWorkflowLayoutsOrder(orders, props.stepId),
      cloneItem: cloneWorkflowLayout,
      onUpdate: inject('emitWorkflowUpdate'),
    });

    const { draggableList } = useContextListSync<WorkflowLayout>(state, emit, {
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
