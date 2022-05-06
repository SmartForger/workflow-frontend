<template>
  <div class="q-pa-md">
    <page-header title="Actions List">
      <template #rightSide>
        <q-btn color="primary" @click="addItem()"> <q-icon name="add"></q-icon> Add New </q-btn>
      </template>
    </page-header>
    <q-table :rows="state.context.list" :columns="tableColumns" row-key="id">
      <template v-slot:body-cell-components="props">
        <q-td key="components" :props="props">
          {{ formatCategories(props.row.components) }}
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td key="actions" :props="props">
          <q-btn
            class="q-mr-sm"
            @click="editItem(props.row)"
            label="Edit"
            type="button"
            color="primary"
            size="sm"
          />
          <q-btn
            label="Delete"
            type="button"
            color="negative"
            size="sm"
            @click="deleteItem(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <q-dialog :model-value="state.matches('add') || state.matches('edit')" persistent>
    <div class="bg-white q-pa-md">
      <workflow-actions-form
        :details="state.context.current"
        :editing="state.matches('edit')"
        @save="save"
        @cancel="cancel"
        @update="update"
      />
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { WorkflowAction } from 'src/common/types/WorkflowAction';
import { useListMachine } from 'src/common/composables/useListMachine';
import { componentTypesByValue } from 'src/common/constants/componentTypes';
import api from 'src/common/api';
import PageHeader from 'src/components/PageHeader.vue';
import WorkflowActionsForm from './WorkflowActionForm.vue';

const tableColumns = [
  {
    name: 'name',
    label: 'Action',
    field: 'name',
    align: 'left',
  },
  {
    name: 'code',
    label: 'Code',
    field: 'code',
    align: 'left',
  },
  {
    name: 'content',
    label: 'Content',
    field: 'content',
    align: 'left',
  },
  {
    name: 'components',
    label: 'Components',
    field: 'components',
    align: 'left',
  },
  {
    name: 'actions',
    label: 'Actions',
    align: 'left',
  },
];

export default defineComponent({
  name: 'WorkflowActionsList',
  components: { PageHeader, WorkflowActionsForm },
  setup() {
    const { state, addItem, editItem, deleteItem, save, cancel, update } =
      useListMachine<WorkflowAction>({
        id: 'actionsMachine',
        getListRequest: api.getWorkflowActions,
        createItemRequest: api.createWorkflowAction,
        updateItemRequest: api.updateWorkflowAction,
        deleteItemRequest: api.deleteWorkflowAction,
      });

    const formatCategories = (components: string[] | undefined) => {
      const result = (components || [])
        .map((c) => (componentTypesByValue[c] || {}).label)
        .filter((label) => !!label)
        .join(', ');

      return result || 'General';
    };

    return {
      state,
      tableColumns,
      addItem,
      editItem,
      deleteItem,
      save,
      cancel,
      update,
      formatCategories,
    };
  },
});
</script>
