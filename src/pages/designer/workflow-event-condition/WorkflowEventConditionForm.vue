<template>
  <q-card class="q-ma-sm q-pa-sm" bordered>
    <q-form @submit="save">
      <q-input
        class="pvn-field"
        dense
        outlined
        v-model="name"
        label="Condition Name"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="text_fields" />
        </template>
      </q-input>

      <q-input
        class="pvn-field"
        dense
        outlined
        v-model="filterJson"
        label="Filter"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="text_fields" />
        </template>
      </q-input>

      <div class="row q-mt-md">
        <q-btn class="q-mr-sm" type="submit" label="Save Condition" icon="save" color="primary"></q-btn>
        <q-btn label="Cancel" @click="cancel()"></q-btn>
      </div>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { WorkflowEventCondition } from 'src/common/types/WorkflowEventCondition';
import { required } from 'src/common/utils/validations';

export default defineComponent({
  props: {
    details: {
      type: Object as PropType<WorkflowEventCondition>,
      required: true,
    },
  },
  emits: ['save', 'cancel', 'update'],
  setup(props, { emit }) {
    const { save, cancel, getFieldModel } = useDetailsForm<WorkflowEventCondition>(props, emit);

    const name = getFieldModel('name', '');
    const filterJson = getFieldModel('filterJson', '');

    return {
      name,
      filterJson,
      save,
      cancel,
      required,
    };
  },
});
</script>
