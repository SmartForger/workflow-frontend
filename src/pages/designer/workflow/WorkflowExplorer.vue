<template>
  <div v-if="isListView">
    <q-toolbar class="bg-secondary text-white">
      <q-toolbar-title>
        <q-icon size="35px" name="img:src/assets/images/workflow.svg"></q-icon>
        Workflows
      </q-toolbar-title>

      <q-btn @click="addItem()" flat outlined round icon="add" />
    </q-toolbar>

    <div class="q-pa-md">
      <search-input
        :modelValue="state.context.search"
        @update:modelValue="setSearch($event)"
        placeholder="Search workflows ..."
      ></search-input>

      <template v-if="groupedWorkflows.filteredCount">
        <q-banner class="bg-grey-3 q-mt-xs" dense v-if="groupedWorkflows.filtered">
          Filtered {{ groupedWorkflows.filteredCount }} out of
          {{ groupedWorkflows.totalCount }} workflows
        </q-banner>

        <q-list class="q-mt-xs" bordered>
          <template v-for="group in groupedWorkflows.groups" :key="group.category">
            <q-item-label class="q-pb-none" header>{{ group.category }}</q-item-label>

            <q-item
              v-for="workflow in group.workflows"
              :key="workflow.id"
              class="q-my-sm"
              clickable
              v-ripple
            >
              <q-item-section avatar v-if="workflow.icon">
                <icon-renderer
                  :icon="workflow.icon"
                  :iconFileName="workflow.iconFileName"
                  size="46px"
                ></icon-renderer>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-bold text-grey-9">{{ workflow.name }}</q-item-label>
                <q-item-label caption lines="1">
                  <q-badge :key="mode" color="green" class="q-mr-xs" v-for="mode in workflow.mode">
                    {{ mode }}
                  </q-badge>
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="row">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="content_copy"
                    @click="duplicateItem(workflow)"
                  ></q-btn>
                  <q-btn flat round dense icon="edit" @click.prevent="editItem(workflow)" />
                  <q-btn flat round dense icon="delete" @click.prevent="deleteItem(workflow)" />
                </div>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </template>
      <q-banner class="bg-grey-3 q-mt-sm" dense v-else> No workflows found. </q-banner>
    </div>
  </div>
  <workflow-form
    :details="currentItem"
    :editing="state.matches('edit')"
    @save="save"
    @cancel="cancel"
    @update="update"
    v-else
  ></workflow-form>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from 'vue';
import { groupBy, forIn } from 'lodash';
import { useListMachine } from 'src/common/composables/useListMachine';
import api from 'src/common/api';
import { Workflow } from 'src/common/types/Workflow';
import { WorkflowAction } from 'src/common/types/WorkflowAction';
import { cloneWorkflow } from 'src/common/utils/clone';
import SearchInput from 'src/components/SearchInput.vue';
import WorkflowForm from './WorkflowForm.vue';

export default defineComponent({
  name: 'WorkflowExplorer',
  components: {
    SearchInput,
    WorkflowForm,
  },
  emits: ['update:current'],
  setup(props, { emit }) {
    const emitWorkflowUpdate = () => {
      emit('update:current', currentItem.value);
    };

    const {
      state,
      currentItem,
      isListView,
      addItem,
      editItem,
      duplicateItem,
      deleteItem,
      save,
      cancel,
      update,
      setSearch,
    } = useListMachine<Workflow>({
      id: 'workflows',
      createItemRequest: api.createWorkflow,
      getListRequest: api.getWorkflows,
      updateItemRequest: api.updateWorkflow,
      deleteItemRequest: api.deleteWorkflow,
      cloneItem: cloneWorkflow,
      onUpdate: emitWorkflowUpdate,
      updateWhen: {
        detailsView: true,
      },
    });

    const { state: actionsState } = useListMachine<WorkflowAction>({
      id: 'workflowActions',
      getListRequest: api.getWorkflowActions,
    });

    provide('workflowActions', actionsState);
    provide('emitWorkflowUpdate', emitWorkflowUpdate);

    const groupedWorkflows = computed(() => {
      const searchVal = state.value.context.search.toLowerCase();
      const filteredWorkflows = state.value.context.list.filter((workflow) =>
        workflow.name.toLowerCase().includes(searchVal)
      );

      const grouped = groupBy(filteredWorkflows, 'category');
      const groups: Array<{ category: string; workflows: Workflow[] }> = [];
      forIn(grouped, (group, category) => {
        groups.push({ category, workflows: group });
      });

      return {
        filtered: !!searchVal,
        filteredCount: filteredWorkflows.length,
        totalCount: state.value.context.list.length,
        groups,
      };
    });

    return {
      state,
      currentItem,
      isListView,
      addItem,
      editItem,
      duplicateItem,
      deleteItem,
      save,
      cancel,
      update,
      setSearch,
      groupedWorkflows,
    };
  },
});
</script>
