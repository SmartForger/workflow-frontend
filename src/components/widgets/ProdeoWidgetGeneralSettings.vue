<template>
  <q-select
    class="pvn-field"
    dense
    outlined
    v-model="widgetType"
    :options="widgetTypeOptions"
    label="Widget Type"
    :rules="[required()]"
  >
    <template v-slot:prepend>
      <q-icon name="widgets" />
    </template>
  </q-select>

  <q-input
    class="pvn-field"
    dense
    outlined
    v-model="name"
    label="Widget Name"
    :rules="[required()]"
  >
    <template v-slot:prepend>
      <q-icon name="text_fields" />
    </template>
  </q-input>

  <q-input class="pvn-field" dense outlined v-model="description" label="Description">
    <template v-slot:prepend>
      <q-icon name="text_fields" />
    </template>
  </q-input>

  <file-uploader label="Icon" field-icon="image" v-model="icon"></file-uploader>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import { WorkflowWidgetType } from 'src/common/types/WorkflowWidgetType';
import { required } from 'src/common/utils/validations';

export const widgetTypeOptions = [
  WorkflowWidgetType.BUTTON,
  WorkflowWidgetType.INPUT,
  WorkflowWidgetType.SELECT,
  WorkflowWidgetType.LIST,
  WorkflowWidgetType.TABLE,
  WorkflowWidgetType.SIGNATURE,
  WorkflowWidgetType.VIDEO,
];

export default defineComponent({
  props: {
    details: {
      type: Object as PropType<WorkflowWidget>,
      required: true,
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const { getFieldModel, getIconModel } = useDetailsForm<WorkflowWidget>(props, emit);
    const widgetType = getFieldModel('type', '');
    const name = getFieldModel('name', '');
    const description = getFieldModel('description', '');
    const icon = getIconModel();

    return { widgetType, name, description, icon, widgetTypeOptions, required };
  },
});
</script>
