<template>
  <q-form ref="formRef" class="action-form">
    <q-input class="pvn-field" dense outlined v-model="name" label="Action" :rules="[required()]">
      <template v-slot:prepend>
        <q-icon name="text_fields" />
      </template>
    </q-input>
    <select-component
      v-model="actionType"
      label="Type"
      icon="category"
      :options="actionTypes"
      required
    />
    <q-input class="pvn-field" dense outlined v-model="code" label="Code" :rules="[required()]">
      <template v-slot:prepend>
        <q-icon name="text_fields" />
      </template>
    </q-input>
    <q-input
      class="pvn-field"
      dense
      outlined
      v-model="content"
      label="Content"
      :rules="[required()]"
    >
      <template v-slot:prepend>
        <q-icon name="text_fields" />
      </template>
    </q-input>
    <chip-select
      v-model="components"
      icon="category"
      label="Components"
      :options="componentTypes"
    />
  </q-form>
  <div class="q-mt-md">
    <q-btn class="q-mr-sm" @click="save()" label="Save" type="button" color="primary" />
    <q-btn @click="cancel()" label="Cancel" type="button"></q-btn>
  </div>
</template>

<style lang="scss" scoped>
.action-form {
  width: 500px;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { WorkflowAction } from 'src/common/types/WorkflowAction';
import { required, arrayRequired } from 'src/common/utils/validations';
import { actionTypes } from 'src/common/constants/actionTypes';
import { componentTypes } from 'src/common/constants/componentTypes';

export default defineComponent({
  name: 'WorkflowActionForm',
  props: {
    editing: Boolean,
    details: {
      type: Object as PropType<WorkflowAction>,
      required: true,
    },
  },
  emits: ['save', 'cancel', 'update'],
  setup(props, { emit }) {
    const { formRef, save, cancel, getFieldModel } = useDetailsForm<WorkflowAction>(props, emit);

    const name = getFieldModel('name', '');
    const actionType = getFieldModel('type', '');
    const code = getFieldModel('code', '');
    const content = getFieldModel('content', '');
    const components = getFieldModel('components', []);

    return {
      formRef,
      required,
      arrayRequired,
      save,
      cancel,
      actionTypes,
      componentTypes,
      name,
      actionType,
      code,
      content,
      components,
    };
  },
});
</script>
