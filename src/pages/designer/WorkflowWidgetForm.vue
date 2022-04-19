<template>
  <q-card class="q-ma-sm q-pa-sm" bordered>
    <q-form @submit="save">
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
        v-model="displayName"
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
        v-model="description"
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
          <q-avatar square v-if="details.icon">
            <img :src="details.icon" />
          </q-avatar>
        </template>
      </q-file>

      <q-input
        class="pvn-field"
        dense
        outlined
        v-model="field"
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
        v-model="updateEvent"
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
          label="Save Widget"
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
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import { required } from 'src/common/utils/validations';
import { widgetTypeOptions } from './constants';

export default defineComponent({
  props: {
    details: {
      type: Object as PropType<WorkflowWidget>,
      required: true,
    },
  },
  emits: ['save', 'cancel', 'update'],
  setup(props, { emit }) {
    const { save, cancel, getFieldModel, getIconFileModel } =
      useDetailsForm<WorkflowWidget>(props, emit);

    const widgetType = getFieldModel('type', '');
    const displayName = getFieldModel('displayName', '');
    const description = getFieldModel('description', '');
    const iconFile = getIconFileModel('iconFileName', 'icon');
    const field = getFieldModel('field', '');
    const updateEvent = getFieldModel('updateEvent', '');

    return {
      widgetTypeOptions,
      widgetType,
      displayName,
      description,
      iconFile,
      field,
      updateEvent,
      save,
      cancel,
      required,
    };
  },
});
</script>
