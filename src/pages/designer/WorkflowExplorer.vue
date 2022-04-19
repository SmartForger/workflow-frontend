<template>
  <div
    v-if="
      state.matches('list') ||
      state.matches('listRequest') ||
      state.matches('deleteRequest')
    "
  >
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
        <q-banner
          class="bg-grey-3 q-mt-xs"
          dense
          v-if="groupedWorkflows.filtered"
        >
          Filtered {{ groupedWorkflows.filteredCount }} out of
          {{ groupedWorkflows.totalCount }} workflows
        </q-banner>

        <q-list class="q-mt-xs" bordered>
          <template
            v-for="group in groupedWorkflows.groups"
            :key="group.category"
          >
            <q-item-label class="q-pb-none" header>{{
              group.category
            }}</q-item-label>

            <q-item
              v-for="workflow in group.workflows"
              :key="workflow.id"
              class="q-my-sm"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar square v-if="workflow.icon">
                  <img :src="workflow.icon" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ workflow.displayName }}</q-item-label>
                <q-item-label caption lines="1">
                  <q-badge
                    :key="mode"
                    color="green"
                    class="q-mr-xs"
                    v-for="mode in workflow.mode"
                  >
                    {{ mode }}
                  </q-badge>
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="row">
                  <q-btn
                    flat
                    round
                    dense
                    icon="edit"
                    @click.prevent="editItem(workflow)"
                  />
                  <q-btn
                    flat
                    round
                    dense
                    icon="delete"
                    @click.prevent="deleteItem(workflow)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </template>
      <q-banner class="bg-grey-3 q-mt-sm" dense v-else>
        No workflows found.
      </q-banner>
    </div>
  </div>
  <workflow-details
    :details="state.context.current"
    :editing="state.matches('edit')"
    @save="save"
    @cancel="cancel"
    @update="update"
    v-else
  ></workflow-details>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { v4 as uuid } from 'uuid';
import { groupBy, forIn } from 'lodash';
import { useListMachine } from 'src/common/composables/useListMachine';
import api from 'src/common/api';
import { Workflow } from 'src/common/types/Workflow';
import SearchInput from 'src/components/SearchInput.vue';
import WorkflowDetails from './WorkflowDetails.vue';

export default defineComponent({
  name: 'WorkflowExplorer',
  components: {
    SearchInput,
    WorkflowDetails,
  },
  setup() {
    const {
      state,
      addItem,
      editItem,
      deleteItem,
      save,
      cancel,
      update,
      setSearch,
    } = useListMachine<Workflow>({
      id: 'workflows',
      createEmptyItem: () => ({
        id: uuid(),
        category: '',
        subCategory: '',
        name: '',
        mode: [],
        displayName: '',
        description: '',
        icon: '',
        iconFileName: '',
        steps: [],
      }),
      createItemRequest: api.createWorkflow,
      getListRequest: api.getWorkflows,
      updateItemRequest: api.updateWorkflow,
      deleteItemRequest: api.deleteWorkflow,
    });

    const groupedWorkflows = computed(() => {
      const searchVal = state.value.context.search.toLowerCase();
      const filteredWorkflows = state.value.context.list.filter((workflow) =>
        workflow.displayName.toLowerCase().includes(searchVal)
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
      addItem,
      editItem,
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
