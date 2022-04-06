<template>
  <q-expansion-item
    group="settings"
    dense
    expand-separator
    v-model="open"
    @after-hide="send({ type: 'BACK' })"
  >
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="img:src/assets/images/widgets.svg" />
      </q-item-section>

      <q-item-section> Widgets </q-item-section>

      <q-item-section side>
        <q-btn flat round icon="add" @click.stop="add()"></q-btn>
      </q-item-section>
    </template>

    <workflow-widget-form
      :widget="state.context.selected"
      @save="send({ type: 'SAVE', item: $event })"
      @cancel="send({ type: 'BACK' })"
      v-if="state.matches('add') || state.matches('edit')"
    ></workflow-widget-form>

    <div class="q-pa-sm" v-if="state.matches('list')">
      <div class="q-px-sm" v-if="!state.context.list.length">No widgets</div>
      <q-list dense bordered v-else>
        <q-item :key="widget.id" v-for="widget in state.context.list">
          <q-item-section avatar>
            <q-avatar square>
              <img :src="widget.icon" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ widget.displayName }}</q-item-label>
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
                icon="edit"
                @click="send({ type: 'EDIT', item: widget })"
              ></q-btn>
              <q-btn
                flat
                round
                size="sm"
                icon="delete"
                @click="send({ type: 'DELETE', item: widget })"
              ></q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMachine } from '@xstate/vue';
import { createListViewMachine } from 'src/common/machines/list-view.machine';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import WorkflowWidgetForm from './WorkflowWidgetForm.vue';

const widgetsMachine = createListViewMachine<WorkflowWidget>('widgets');

export default defineComponent({
  components: {
    WorkflowWidgetForm,
  },
  setup() {
    const { state, send } = useMachine(widgetsMachine);
    const open = ref(false);

    const add = () => {
      send({ type: 'ADD' });
      if (!open.value) {
        setTimeout(() => {
          open.value = true;
        }, 50);
      }
    };

    return { state, open, send, add };
  },
});
</script>
