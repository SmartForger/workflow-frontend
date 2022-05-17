<template>
  <q-card class="q-ma-sm q-pa-sm" bordered>
    <q-form @submit="save">
      <q-select
        class="pvn-field"
        outlined
        v-model="info"
        :options="actionsState.context.list"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="receipt_long" />
        </template>
        <template v-slot:selected>
          <div v-if="info.id">
            <div>{{ info.name }}</div>
            <div>
              <q-chip color="green" dense v-if="info.type">{{ info.type }}</q-chip>
              <q-chip dense :key="component" v-for="component in info.components">{{
                component
              }}</q-chip>
              <q-chip dense v-if="!info.components?.length">General</q-chip>
            </div>
          </div>
          <div v-else>Please select an action</div>
        </template>
        <template v-slot:option="{ itemProps, opt }">
          <q-item v-bind="itemProps">
            <q-item-section>
              <q-item-label v-html="opt.name" />
              <div>
                <q-chip color="green" dense>{{ opt.type }}</q-chip>
                <q-chip dense :key="component" v-for="component in opt.components">
                  {{ component }}
                </q-chip>
                <q-chip dense v-if="!opt.components?.length">General</q-chip>
              </div>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <div class="row q-mt-md">
        <q-btn
          class="q-mr-sm"
          type="submit"
          label="Save Action"
          icon="save"
          color="primary"
        ></q-btn>
        <q-btn label="Cancel" @click="cancel()"></q-btn>
      </div>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, inject } from 'vue';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { WorkflowAction } from 'src/common/types/WorkflowAction';
import { WorkflowEventAction } from 'src/common/types/WorkflowEventAction';
import { required } from 'src/common/utils/validations';

export default defineComponent({
  props: {
    details: {
      type: Object as PropType<WorkflowEventAction>,
      required: true,
    },
  },
  emits: ['save', 'cancel', 'update'],
  setup(props, { emit }) {
    const { save, cancel, getFieldModel } = useDetailsForm<WorkflowEventAction>(props, emit);
    const actionsState = inject<{ value: { context: { list: WorkflowAction[] } } }>(
      'workflowActions'
    );

    const info = getFieldModel('info', props.details.info || { name: '', id: 0 });

    return {
      actionsState,
      info,
      save,
      cancel,
      required,
    };
  },
});
</script>
