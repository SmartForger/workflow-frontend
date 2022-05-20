<template>
  <q-input class="pvn-field" dense outlined v-model="field" label="Field" :rules="[required()]">
    <template v-slot:prepend>
      <q-icon name="img:src/assets/images/field.svg" />
    </template>
  </q-input>
  <div class="row">
    <div class="col-4">
      <q-toggle class="field" color="primary" label="Dense" v-model="dense" />
    </div>
    <div class="col-4">
      <q-toggle class="field" color="primary" label="Filled" v-model="filled" />
    </div>
    <div class="col-4">
      <q-toggle class="field" color="primary" label="Outlined" v-model="outlined" />
    </div>
    <div class="col-4">
      <q-toggle class="field" color="primary" label="Rounded" v-model="rounded" />
    </div>
    <div class="col-4">
      <q-toggle class="field" color="primary" label="Square" v-model="square" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.field {
  width: 100%;
}
</style>

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
    const { getExtraFieldModel, getFieldModel } = useDetailsForm<WorkflowWidget>(props, emit);
    const field = getFieldModel('field', '');
    const dense = getExtraFieldModel('dense', false);
    const filled = getExtraFieldModel('filled', false);
    const outlined = getExtraFieldModel('outlined', false);
    const rounded = getExtraFieldModel('rounded', false);
    const square = getExtraFieldModel('square', false);

    return { field, dense, filled, outlined, rounded, square, required };
  },
});
</script>
