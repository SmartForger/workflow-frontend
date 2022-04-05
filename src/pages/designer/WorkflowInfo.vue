<template>
  <q-card-section>
    <q-select
      class="q-pb-xs"
      dense
      outlined
      v-model="workflow.category"
      :options="workflowCategories"
      label="Category"
    >
      <template v-slot:prepend>
        <q-icon name="business" />
      </template>
    </q-select>
    <q-select
      class="q-pb-xs"
      dense
      outlined
      v-model="workflow.subCategory"
      :options="workflowVerticals"
      label="Sub Category"
    >
      <template v-slot:prepend>
        <q-icon name="category" />
      </template>
    </q-select>
    <q-input
      class="q-pb-xs"
      dense
      outlined
      v-model="workflow.displayName"
      label="Workflow Name"
      placeholder="Workflow name"
    >
      <template v-slot:prepend>
        <q-icon name="text_fields" />
      </template>
    </q-input>
    <q-input
      class="q-pb-xs"
      type="textarea"
      rows="2"
      dense
      outlined
      v-model="workflow.description"
      label="Description"
      placeholder="Description"
    >
      <template v-slot:prepend>
        <q-icon name="text_fields" />
      </template>
    </q-input>
    <q-select
      class="q-pb-xs"
      dense
      use-input
      use-chips
      outlined
      multiple
      v-model="selectedModes"
      :options="workflowModes"
      label="Mode"
    >
      <template v-slot:prepend>
        <q-icon name="img:src/assets/images/mode.svg" />
      </template>
    </q-select>

    <q-file
      dense
      class="q-pb-xs"
      color="teal"
      outlined
      v-model="iconFile"
      label="Select Workflow Icon"
    >
      <template v-slot:prepend>
        <q-icon name="image" />
      </template>

      <template v-slot:append>
        <q-avatar square v-if="workflow.icon">
          <img :src="workflow.icon" />
        </q-avatar>
      </template>
    </q-file>
  </q-card-section>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { useFile } from 'src/common/composables/useFile';
import { Workflow } from 'src/common/types/Workflow';
import {
  workflowCategories,
  workflowVerticals,
  workflowModes,
} from './constants';

export default defineComponent({
  props: {
    details: {
      type: Object as PropType<Workflow>,
      required: true,
    },
  },
  setup(props) {
    const workflow = ref<Workflow>(props.details);
    const { file: iconFile } = useFile(
      workflow.value.iconFileName,
      (filename, data) => {
        workflow.value.icon = data;
        workflow.value.iconFileName = filename;
      }
    );

    const selectedModes = computed({
      get: () => (workflow.value.mode ? workflow.value.mode.split(',') : []),
      set: (modes) => {
        workflow.value.mode = modes.join(',');
      },
    });

    return {
      workflowCategories,
      workflowVerticals,
      workflowModes,
      workflow,
      selectedModes,
      iconFile,
    };
  },
});
</script>
