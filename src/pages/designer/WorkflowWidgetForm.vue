<template>
  <q-form class="q-pa-md" @submit="save">
    <q-select
      class="pvn-field"
      dense
      outlined
      v-model="formData.type"
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
      v-model="formData.displayName"
      label="Display Name"
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
      v-model="formData.description"
      label="Description"
      :rules="[required()]"
    >
      <template v-slot:prepend>
        <q-icon name="text_fields" />
      </template>
    </q-input>

    <q-file
      class="pvn-field"
      outlined
      dense
      label="Select Widget Icon"
      v-model="iconFile"
      :rules="[required()]"
    >
      <template v-slot:prepend>
        <q-icon name="image" />
      </template>
      <template v-slot:append>
        <q-avatar square v-if="formData.icon">
          <img :src="formData.icon" />
        </q-avatar>
      </template>
    </q-file>

    <q-input
      class="pvn-field"
      dense
      outlined
      v-model="formData.field"
      label="Field"
      :rules="[required()]"
    >
      <template v-slot:prepend>
        <q-icon name="img:src/assets/images/field.svg" />
      </template>
    </q-input>

    <q-input
      class="pvn-field"
      dense
      outlined
      v-model="formData.updateEvent"
      label="On Update Event"
    >
      <template v-slot:prepend>
        <q-icon name="img:src/assets/images/update_event.svg" />
      </template>
    </q-input>

    <div class="row q-mt-md">
      <q-btn
        class="q-mr-sm"
        type="submit"
        label="Save"
        icon="save"
        color="primary"
      ></q-btn>
      <q-btn label="Cancel" @click="cancel()"></q-btn>
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import { WorkflowWidgetType } from 'src/common/types/WorkflowWidgetType';
import { useFile } from 'src/common/composables/useFile';
import { required } from 'src/common/utils/validations';
import { widgetTypeOptions } from './constants';

export default defineComponent({
  props: {
    widget: {
      type: Object as () => WorkflowWidget,
    },
  },
  setup(props, { emit }) {
    const formData = ref<WorkflowWidget>(
      props.widget
        ? { ...props.widget }
        : {
            id: new Date().getTime(),
            type: WorkflowWidgetType.INPUT,
            displayName: '',
            description: '',
            icon: '',
            iconFileName: '',
            field: '',
            updateEvent: '',
          }
    );
    const { file: iconFile } = useFile(
      formData.value.iconFileName,
      (filename, data) => {
        formData.value.iconFileName = filename;
        formData.value.icon = data;
      }
    );

    const save = () => {
      emit('save', formData.value);
    };

    const cancel = () => {
      emit('cancel');
    };

    return { widgetTypeOptions, formData, iconFile, save, cancel, required };
  },
});
</script>
