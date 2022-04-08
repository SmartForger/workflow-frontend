<template>
  <q-expansion-item
    :group="expansionGroup"
    dense
    v-model="open"
    @after-hide="cancel()"
  >
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="img:src/assets/images/widgets.svg" />
      </q-item-section>

      <q-item-section>
        Widgets ({{ state.context.list.length }})
      </q-item-section>

      <q-item-section side>
        <q-btn flat round icon="add" @click.stop="add()"></q-btn>
      </q-item-section>
    </template>

    <div class="q-pa-sm" v-if="state.matches('list')">
      <div class="q-px-sm" v-if="!state.context.list.length">No widgets</div>
      <q-list bordered v-else>
        <draggable v-model="list" handle=".handle" item-key="id">
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
                    @click="editItem(widget)"
                  ></q-btn>
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="delete"
                    @click="deleteItem(widget)"
                  ></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </draggable>
      </q-list>
    </div>

    <workflow-widget-form
      :details="state.context.current"
      @save="save"
      @cancel="cancel"
      @update="update"
      v-else
    ></workflow-widget-form>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { v4 as uuid } from 'uuid';
import Draggable from 'vuedraggable';
import { useContextListSync } from 'src/common/composables/useContextListSync';
import { useListMachine } from 'src/common/composables/useListMachine';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import { WorkflowWidgetType } from 'src/common/types/WorkflowWidgetType';
import WorkflowWidgetForm from './WorkflowWidgetForm.vue';

export default defineComponent({
  components: {
    Draggable,
    WorkflowWidgetForm,
  },
  props: {
    expansionGroup: {
      type: String,
      required: true,
    },
    widgets: {
      type: Object as PropType<WorkflowWidget[]>,
      required: true,
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const { state, addItem, editItem, save, cancel, update, setList } =
      useListMachine<WorkflowWidget>('worflowWidgets', () => ({
        id: uuid(),
        type: WorkflowWidgetType.INPUT,
        displayName: '',
        description: '',
        icon: '',
        iconFileName: '',
        field: '',
        updateEvent: '',
      }));
    const list = useContextListSync<WorkflowWidget>(state, setList, emit);

    setList([...props.widgets]);

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
      list,
      add,
      editItem,
      save,
      cancel,
      update,
      setList,
      open,
    };
  },
});
</script>
