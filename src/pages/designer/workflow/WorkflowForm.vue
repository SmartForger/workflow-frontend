<template>
  <q-toolbar class="bg-secondary text-white">
    <q-btn round flat icon="arrow_back" @click="cancel()"></q-btn>
    <q-toolbar-title class="col">
      {{ editing ? 'Edit workflow' : 'Add workflow' }}
    </q-toolbar-title>
    <q-space></q-space>
    <q-btn flat icon="save" label="Save" @click="save()"></q-btn>
  </q-toolbar>

  <div class="q-pa-md">
    <q-form ref="formRef">
      <q-select
        class="pvn-field"
        dense
        outlined
        v-model="category"
        :options="workflowCategories"
        label="Category"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="business" />
        </template>
      </q-select>
      <q-select
        class="pvn-field"
        dense
        outlined
        v-model="subCategory"
        :options="workflowVerticals"
        label="Sub Category"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="category" />
        </template>
      </q-select>
      <q-input
        class="pvn-field"
        dense
        outlined
        v-model="name"
        label="Workflow Name"
        placeholder="Workflow name"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="text_fields" />
        </template>
      </q-input>
      <q-input
        class="pvn-field"
        type="textarea"
        rows="2"
        dense
        outlined
        v-model="description"
        label="Description"
        placeholder="Description"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="text_fields" />
        </template>
      </q-input>
      <q-select
        class="pvn-field"
        dense
        use-input
        use-chips
        outlined
        multiple
        v-model="mode"
        :options="workflowModes"
        label="Mode"
        :rules="[arrayRequired()]"
      >
        <template v-slot:prepend>
          <q-icon name="img:src/assets/images/mode.svg" />
        </template>
      </q-select>

      <file-uploader
        label="Icon"
        field-icon="image"
        v-model="icon"
        :rules="[arrayRequired()]"
      ></file-uploader>
    </q-form>

    <workflow-steps :workflow="details" @update="update('steps', $event)"></workflow-steps>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDetailsForm } from 'src/common/composables/useDetailsForm';
import { Workflow } from 'src/common/types/Workflow';
import FileUploader from 'src/components/FileUploader.vue';
import { required, arrayRequired } from 'src/common/utils/validations';
import WorkflowSteps from '../workflow-step/WorkflowSteps.vue';
import { workflowCategories, workflowVerticals, workflowModes } from '../constants';

export default defineComponent({
  name: 'WorkflowDetails',
  components: { WorkflowSteps, FileUploader },
  props: {
    editing: Boolean,
    details: {
      type: Object as PropType<Workflow>,
      required: true,
    },
  },
  emits: ['save', 'cancel', 'update'],
  setup(props, { emit }) {
    const { formRef, save, cancel, update, getFieldModel, getIconModel } =
      useDetailsForm<Workflow>(props, emit);

    const category = getFieldModel('category', '');
    const subCategory = getFieldModel('subCategory', '');
    const name = getFieldModel('name', '');
    const description = getFieldModel('description', '');
    const mode = getFieldModel('mode', []);
    const icon = getIconModel();

    return {
      workflowCategories,
      workflowVerticals,
      workflowModes,
      formRef,
      category,
      subCategory,
      name,
      description,
      mode,
      icon,
      save,
      cancel,
      update,
      required,
      arrayRequired,
    };
  },
});
</script>
