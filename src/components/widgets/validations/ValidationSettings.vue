<template>
  <div>
    <q-list bordered>
      <draggable-list v-model="draggableList" handle=".handle" item-key="id">
        <template #item="{ element: rule }">
          <q-expansion-item>
            <template #header>
              <q-item-section side>
                <q-icon class="handle" name="drag_indicator"></q-icon>
              </q-item-section>

              <q-item-section class="col">
                <q-item-label>{{ validationsByValue[rule.type]?.label || '' }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="row">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="content_copy"
                    @click="duplicateItem(rule, $event)"
                  ></q-btn>
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="delete"
                    @click="deleteItem(rule, $event)"
                  ></q-btn>
                </div>
              </q-item-section>
            </template>

            <div class="q-pa-md">
              <validation-rule-form
                :details="rule"
                @update="updateItem($event, rule.id)"
              ></validation-rule-form>
            </div>
          </q-expansion-item>
        </template>
      </draggable-list>
    </q-list>

    <q-btn class="q-mt-md" color="primary" label="Add rule" @click="addItemInList()"></q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { keyBy } from 'lodash';
import { useContextListSync } from 'src/common/composables/useContextListSync';
import { useListMachine } from 'src/common/composables/useListMachine';
import { ValidationRule } from 'src/common/types/ValidationRule';
import { validationTypes } from 'src/common/constants/validationTypes';
import ValidationRuleForm from './ValidationRuleForm.vue';
import { cloneEntity } from 'src/common/utils/clone';

export default defineComponent({
  components: { ValidationRuleForm },
  props: {
    rules: {
      type: Array as PropType<ValidationRule[]>,
      default: () => [],
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const {
      state,
      isListView,
      currentItem,
      addItemInList,
      editItem,
      deleteItem,
      duplicateItem,
      orderItems,
      update,
      save,
      cancel,
    } = useListMachine<ValidationRule>({
      id: 'validations',
      getListRequest: async () => props.rules,
      cloneItem: cloneEntity,
    });
    const { draggableList } = useContextListSync(state, emit, {
      onReorder: orderItems,
    });
    const validationsByValue = keyBy(validationTypes, 'value');

    const updateItem = (updates: Partial<ValidationRule>, id: string) => {
      update({
        id,
        ...updates,
      });
      emit('update', state.value.context.list);
    };

    return {
      draggableList,
      isListView,
      currentItem,
      addItemInList,
      editItem,
      deleteItem,
      duplicateItem,
      save,
      updateItem,
      cancel,
      validationsByValue,
    };
  },
});
</script>
