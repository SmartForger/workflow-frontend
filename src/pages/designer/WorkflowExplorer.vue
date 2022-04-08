<template>
  <div v-if="state.matches('list')">
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

      <template v-if="filteredWorkflows.length">
        <q-banner class="bg-grey-3 q-mt-xs" dense v-if="filtered">
          Filtered {{ filteredWorkflows.length }} out of
          {{ state.context.list.length }} workflows
        </q-banner>

        <q-list class="q-mt-sm" bordered>
          <q-item
            v-for="workflow in filteredWorkflows"
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

          <q-separator />
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
import { useListMachine } from 'src/common/composables/useListMachine';
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
    } = useListMachine<Workflow>('workflows', () => ({
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
    }));

    const filteredWorkflows = computed(() => {
      const searchVal = state.value.context.search.toLowerCase();
      return state.value.context.list.filter((workflow) =>
        workflow.displayName.toLowerCase().includes(searchVal)
      );
    });
    const filtered = computed(() => {
      return filteredWorkflows.value.length < state.value.context.list.length;
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
      filteredWorkflows,
      filtered,
    };
  },
});
</script>
