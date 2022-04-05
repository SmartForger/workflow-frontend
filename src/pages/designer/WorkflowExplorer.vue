<template>
  <div v-if="state.matches('list')">
    <q-toolbar class="bg-secondary text-white">
      <q-toolbar-title>
        <q-icon size="35px" name="img:src/assets/images/workflow.svg"></q-icon>
        Workflows
      </q-toolbar-title>

      <q-btn @click="send({ type: 'ADD' })" flat outlined round icon="add" />
    </q-toolbar>

    <div class="q-pa-xs">
      <search-input
        :modelValue="state.context.search"
        @update:modelValue="(val) => send({ type: 'SET_SEARCH', search: val })"
        placeholder="Search workflows ..."
      ></search-input>

      <template v-if="filteredWorkflows.length">
        <q-banner class="bg-grey-3 q-mt-xs" dense v-if="filtered">
          Filtered {{ filteredWorkflows.length }} out of
          {{ state.context.list.length }} workflows
        </q-banner>

        <q-list class="q-mt-xs" bordered>
          <q-item
            v-for="workflow in filteredWorkflows"
            :key="workflow.id"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar>
                <q-icon size="30px" :name="workflow.icon"></q-icon>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ workflow.displayName }}</q-item-label>
              <q-item-label caption lines="1">
                <q-badge color="green"> mode: {{ workflow.mode }} </q-badge>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                flat
                round
                dense
                color="secondary"
                icon="edit"
                @click.prevent="send({ type: 'EDIT', item: workflow })"
              />
            </q-item-section>
          </q-item>

          <q-separator />
        </q-list>
      </template>
      <q-banner class="bg-grey-3 q-mt-xs" dense v-else>
        No workflows found.
      </q-banner>
    </div>
  </div>
  <div v-if="state.matches('add') || state.matches('edit')">
    <workflow-details
      :workflow="state.context.selected"
      :editing="state.matches('edit')"
      @back="send({ type: 'BACK' })"
      @save="send({ type: 'SAVE', item: $event })"
    ></workflow-details>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useMachine } from '@xstate/vue';
import { createListViewMachine } from 'src/common/machines/list-view.machine';
import { Workflow } from 'src/common/types/Workflow';
import SearchInput from 'src/components/SearchInput.vue';
import WorkflowDetails from './WorkflowDetails.vue';

const explorerMachine = createListViewMachine<Workflow>('explorer');

export default defineComponent({
  name: 'WorkflowExplorer',
  components: {
    SearchInput,
    WorkflowDetails,
  },
  setup() {
    const { state, send } = useMachine(explorerMachine, { devTools: true });

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
      send,
      filteredWorkflows,
      filtered,
    };
  },
});
</script>
