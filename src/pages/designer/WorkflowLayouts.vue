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

      <q-item-section>
        Layouts ({{ state.context.list.length }})
      </q-item-section>

      <q-item-section side>
        <q-btn flat round icon="add" @click.stop="add()"></q-btn>
      </q-item-section>
    </template>

    <div
      class="q-pa-sm"
      v-if="
        state.matches('list') ||
        state.matches('listRequest') ||
        state.matches('deleteRequest')
      "
    >
      <div class="q-px-sm" v-if="!state.context.list.length">No layouts</div>
      <q-list bordered v-else>
        <draggable v-model="list" handle=".handle" item-key="id">
          <template #item="{ element: layout }">
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-icon class="handle" name="drag_indicator"></q-icon>
              </q-item-section>
              <q-item-section avatar>
                <q-avatar square>
                  <img :src="layout.icon" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ layout.title }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="row">
                  <q-btn
                    flat
                    round
                    size="sm"
                    :icon="layout.visible ? 'visibility' : 'visibility_off'"
                    @click.stop="
                      update({ id: layout.id, visible: !layout.visible })
                    "
                  ></q-btn>
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="edit"
                    @click.stop="editItem(layout)"
                  ></q-btn>
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
        </draggable>
      </q-list>
    </div>

    <workflow-layout-form
      :details="state.context.current"
      @save="save"
      @cancel="cancel"
      @update="update"
      v-else
    ></workflow-layout-form>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { v4 as uuid } from 'uuid';
import Draggable from 'vuedraggable';
import { useContextListSync } from 'src/common/composables/useContextListSync';
import { useListMachine } from 'src/common/composables/useListMachine';
import { WorkflowLayout } from 'src/common/types/WorkflowLayout';
import WorkflowLayoutForm from './WorkflowLayoutForm.vue';

export default defineComponent({
  components: {
    Draggable,
    WorkflowLayoutForm,
  },
  props: {
    expansionGroup: {
      type: String,
      required: true,
    },
    layouts: {
      type: Array as PropType<WorkflowLayout[]>,
      required: true,
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const { state, addItem, editItem, save, cancel, update, setList } =
      useListMachine<WorkflowLayout>('worflowLayouts', () => ({
        id: uuid(),
        title: '',
        icon: '',
        iconFileName: '',
        backgroundColor: '',
        textColor: '',
        visible: true,
        widgets: [],
      }));

    const list = useContextListSync<WorkflowLayout>(state, setList, emit);
    const open = ref(false);

    setList([...props.layouts]);

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
