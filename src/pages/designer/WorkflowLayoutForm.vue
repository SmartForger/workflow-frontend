<template>
  <q-card class="q-ma-sm q-pa-sm" bordered>
    <q-form @submit="save">
      <q-input
        class="pvn-field"
        dense
        outlined
        v-model="title"
        label="Title"
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
        label="Icon"
        v-model="iconFile"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="image" />
        </template>
        <template v-slot:append>
          <q-avatar square v-if="details.icon">
            <img :src="details.icon" />
          </q-avatar>
        </template>
      </q-file>

      <q-input
        outlined
        dense
        class="q-pb-xs"
        v-model="backgroundColor"
        label="Background Color"
      >
        <template v-slot:prepend>
          <q-icon name="format_color_fill" />
        </template>

        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-color v-model="backgroundColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        outlined
        dense
        v-model="textColor"
        class="my-input"
        label="Text Color"
      >
        <template v-slot:prepend>
          <q-icon name="format_color_text" />
        </template>

        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-color v-model="textColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-toggle label="Visibility" v-model="visible" color="green" />

      <q-list bordered>
        <workflow-step-widgets
          expansionGroup="layout"
          :widgets="details.widgets"
          @update="update('widgets', $event)"
        ></workflow-step-widgets>
      </q-list>

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
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { WorkflowLayout } from 'src/common/types/WorkflowLayout';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { required } from 'src/common/utils/validations';
import WorkflowStepWidgets from './WorkflowStepWidgets.vue';

export default defineComponent({
  components: { WorkflowStepWidgets },
  props: {
    details: {
      type: Object as PropType<WorkflowLayout>,
      required: true,
    },
  },
  emits: ['save', 'cancel', 'update'],
  setup(props, { emit }) {
    const { save, cancel, update, getFieldModel, getIconFileModel } =
      useDetailsForm<WorkflowLayout>(props, emit);

    const title = getFieldModel('title');
    const iconFile = getIconFileModel('iconFileName', 'icon');
    const backgroundColor = getFieldModel('backgroundColor');
    const textColor = getFieldModel('textColor');
    const visible = getFieldModel('visible');

    return {
      title,
      iconFile,
      backgroundColor,
      textColor,
      visible,
      required,
      save,
      cancel,
      update,
    };
  },
});
</script>
