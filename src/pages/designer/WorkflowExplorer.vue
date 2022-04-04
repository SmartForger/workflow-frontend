<template>
  <div v-if="state.matches('list')">
    <q-toolbar class="bg-secondary text-white">
      <q-toolbar-title>
        <q-icon size="35px" name="img:src/assets/images/workflow.svg"></q-icon>
        Workflows
      </q-toolbar-title>

      <q-btn @click="send('ADD')" flat outlined round icon="add" />
    </q-toolbar>

    <div class="q-pa-xs">
      <search-input
        :modelValue="state.context.search"
        @update:modelValue="(val) => send({ type: 'SET_SEARCH', search: val })"
        placeholder="Search workflows ..."
      ></search-input>

      <q-banner class="bg-grey-3 q-mt-xs" dense v-if="filtered">
        Filtered {{ filteredWorkflows.length }} out of
        {{ state.context.workflows.length }} workflows
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
            <q-icon name="edit" color="green" />
          </q-item-section>
        </q-item>

        <q-separator />
      </q-list>
    </div>
  </div>
  <div v-if="state.matches('details')">
    <workflow-details
      @back="send({ type: 'BACK' })"
      @save="send({ type: 'SAVE' })"
    ></workflow-details>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useMachine } from '@xstate/vue';
import SearchInput from 'src/components/SearchInput.vue';
import { explorerMachine } from './machines/explorer.machine';
import { sampleWorkflows } from './constants';
import WorkflowDetails from './WorkflowDetails.vue';

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
      return state.value.context.workflows.filter((workflow) =>
        workflow.displayName.toLowerCase().includes(searchVal)
      );
    });
    const filtered = computed(() => {
      return (
        filteredWorkflows.value.length < state.value.context.workflows.length
      );
    });

    send({ type: 'SET_LIST', list: sampleWorkflows });

    return {
      state,
      send,
      filteredWorkflows,
      filtered,
    };
  },
});
</script>
