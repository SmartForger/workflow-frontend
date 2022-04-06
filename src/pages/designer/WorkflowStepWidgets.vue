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
      <draggable
        v-model="widgets"
        class="list-group"
        handle=".handle"
        item-key="id"
        v-else
      >
        <template #item="{ element: widget }">
          <q-item clickable v-ripple>
            <q-item-section side>
              <q-icon class="handle" name="drag_indicator"></q-icon>
            </q-item-section>
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
        </template>
      </draggable>
    </div>
  </q-expansion-item>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useMachine } from '@xstate/vue';
import Draggable from 'vuedraggable';
import { createListViewMachine } from 'src/common/machines/list-view.machine';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import WorkflowWidgetForm from './WorkflowWidgetForm.vue';

const widgetsMachine = createListViewMachine<WorkflowWidget>('widgets');

export default defineComponent({
  components: {
    Draggable,
    WorkflowWidgetForm,
  },
  setup() {
    const { state, send } = useMachine(widgetsMachine);
    const open = ref(false);

    const widgets = computed({
      get: () => state.value.context.list,
      set: (val) => send({ type: 'SET_LIST', list: val }),
    });

    const add = () => {
      send({ type: 'ADD' });
      if (!open.value) {
        setTimeout(() => {
          open.value = true;
        }, 50);
      }
    };

    return { state, widgets, open, send, add };
  },
});
</script>
