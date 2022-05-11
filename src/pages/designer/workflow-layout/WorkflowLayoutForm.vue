<template>
  <q-card class="q-ma-sm q-pa-sm" bordered>
    <q-form @submit="save">
      <q-input class="pvn-field" dense outlined v-model="title" label="Title" :rules="[required()]">
        <template v-slot:prepend>
          <q-icon name="text_fields" />
        </template>
      </q-input>

      <select-component
        :options="layoutTypes"
        icon="category"
        :require="true"
        label="Type"
        v-model="layoutType"
      ></select-component>

      <file-uploader
        label="Icon"
        field-icon="image"
        v-model="icon"
        :rules="[arrayRequired()]"
      ></file-uploader>

      <q-input outlined dense class="q-pb-xs" v-model="backgroundColor" label="Background Color">
        <template v-slot:prepend>
          <q-icon name="format_color_fill" />
        </template>

        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-color v-model="backgroundColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input outlined dense v-model="textColor" class="my-input" label="Text Color">
        <template v-slot:prepend>
          <q-icon name="format_color_text" />
        </template>

        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-color v-model="textColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-toggle label="Visibility" v-model="visible" color="green" />

      <q-list bordered>
        <workflow-widgets
          expansionGroup="layout"
          :widgets="details.widgets"
          :layoutId="details.id"
          @update="update('widgets', $event)"
        ></workflow-widgets>
      </q-list>

      <div class="row q-mt-md">
        <q-btn
          class="q-mr-sm"
          type="submit"
          label="Save Layout"
          icon="save"
          color="primary"
        ></q-btn>
        <q-btn label="Cancel" @click="cancel()"></q-btn>
      </div>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { WorkflowLayout } from 'src/common/types/WorkflowLayout';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import FileUploader from 'src/components/FileUploader.vue';
import { required, arrayRequired } from 'src/common/utils/validations';
import { layoutTypes } from 'src/common/constants/layoutTypes';
import WorkflowWidgets from '../workflow-widget/WorkflowWidgets.vue';

export default defineComponent({
  components: { WorkflowWidgets, FileUploader },
  props: {
    details: {
      type: Object as PropType<WorkflowLayout>,
      required: true,
    },
  },
  emits: ['save', 'cancel', 'update'],
  setup(props, { emit }) {
    const { save, cancel, update, getFieldModel, getIconModel } = useDetailsForm<WorkflowLayout>(
      props,
      emit
    );

    const title = getFieldModel('title', '');
    const icon = getIconModel();
    const backgroundColor = getFieldModel('backgroundColor', '');
    const textColor = getFieldModel('textColor', '');
    const visible = getFieldModel('visible', false);
    const layoutType = getFieldModel('type', '');

    return {
      title,
      icon,
      backgroundColor,
      textColor,
      visible,
      layoutType,
      required,
      arrayRequired,
      save,
      cancel,
      update,
      layoutTypes,
    };
  },
});
</script>
