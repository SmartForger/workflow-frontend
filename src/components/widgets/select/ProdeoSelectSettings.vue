<template>
  <q-input class="pvn-field" dense outlined v-model="field" label="Field" :rules="[required()]">
    <template v-slot:prepend>
      <q-icon name="img:src/assets/images/field.svg" />
    </template>
  </q-input>
  <div class="row">
    <div class="col-4">
      <q-toggle color="primary" label="Dense" v-model="dense" />
    </div>
    <div class="col-4">
      <q-toggle color="primary" label="Filled" v-model="filled" />
    </div>
    <div class="col-4">
      <q-toggle color="primary" label="Outlined" v-model="outlined" />
    </div>
    <div class="col-4">
      <q-toggle color="primary" label="Multiple" v-model="multiple" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import { required } from 'src/common/utils/validations';

export default defineComponent({
  props: {
    details: {
      type: Object as PropType<WorkflowWidget>,
      required: true,
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const { getChildFieldModel, getFieldModel } = useDetailsForm<WorkflowWidget>(props, emit);
    const field = getFieldModel('field', '');
    const dense = getChildFieldModel('extra', 'dense', false);
    const filled = getChildFieldModel('extra', 'filled', false);
    const outlined = getChildFieldModel('extra', 'outlined', false);
    const multiple = getChildFieldModel('extra', 'multiple', false);

    return { field, dense, filled, outlined, multiple, required };
  },
});
</script>
