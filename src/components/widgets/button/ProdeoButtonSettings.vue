<template>
  <q-input
    class="pvn-field"
    dense
    outlined
    v-model="triggerEvent"
    label="Trigger Event"
    :rules="[required()]"
  >
    <template v-slot:prepend>
      <q-icon name="img:src/assets/images/update_event.svg" />
    </template>
  </q-input>
  <div class="row">
    <div class="col-4">
      <q-toggle color="primary" label="Outline" v-model="outline" />
    </div>
    <div class="col-4">
      <q-toggle color="primary" label="Flat" v-model="flat" />
    </div>
    <div class="col-4">
      <q-toggle color="primary" label="Unelevated" v-model="unelevated" />
    </div>
    <div class="col-4">
      <q-toggle color="primary" label="Rounded" v-model="rounded" />
    </div>
    <div class="col-4">
      <q-toggle color="primary" label="Glossy" v-model="glossy" />
    </div>
    <div class="col-4">
      <q-toggle color="primary" label="Fab" v-model="fab" />
    </div>
    <div class="col-4">
      <q-toggle color="primary" label="Fab Mini" v-model="fabMini" />
    </div>
    <div class="col-4">
      <q-toggle color="primary" label="Dense" v-model="dense" />
    </div>
    <div class="col-4">
      <q-toggle color="primary" label="Ripple" v-model="ripple" />
    </div>
    <div class="col-4">
      <q-toggle color="primary" label="Round" v-model="round" />
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
    const { getFieldModel, getExtraFieldModel } = useDetailsForm<WorkflowWidget>(props, emit);
    const triggerEvent = getFieldModel('event', '');
    const outline = getExtraFieldModel('outline', false);
    const flat = getExtraFieldModel('flat', false);
    const unelevated = getExtraFieldModel('unelevated', false);
    const rounded = getExtraFieldModel('rounded', false);
    const glossy = getExtraFieldModel('glossy', false);
    const fab = getExtraFieldModel('fab', false);
    const fabMini = getExtraFieldModel('fabMini', false);
    const dense = getExtraFieldModel('dense', false);
    const ripple = getExtraFieldModel('ripple', false);
    const round = getExtraFieldModel('round', false);

    return {
      triggerEvent,
      outline,
      flat,
      unelevated,
      rounded,
      glossy,
      fab,
      fabMini,
      dense,
      ripple,
      round,
      required,
    };
  },
});
</script>
