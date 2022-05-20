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
    const { getFieldModel, getChildFieldModel } = useDetailsForm<WorkflowWidget>(props, emit);
    const triggerEvent = getFieldModel('event', '');
    const outline = getChildFieldModel('extra', 'outline', false);
    const flat = getChildFieldModel('extra', 'flat', false);
    const unelevated = getChildFieldModel('extra', 'unelevated', false);
    const rounded = getChildFieldModel('extra', 'rounded', false);
    const glossy = getChildFieldModel('extra', 'glossy', false);
    const fab = getChildFieldModel('extra', 'fab', false);
    const fabMini = getChildFieldModel('extra', 'fabMini', false);
    const dense = getChildFieldModel('extra', 'dense', false);
    const ripple = getChildFieldModel('extra', 'ripple', false);
    const round = getChildFieldModel('extra', 'round', false);

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
