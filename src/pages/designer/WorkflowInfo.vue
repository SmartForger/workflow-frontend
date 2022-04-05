<template>
  <q-card-section>
    <q-form ref="formRef" @submit="save">
      <q-select
        class="field"
        dense
        outlined
        v-model="workflow.category"
        :options="workflowCategories"
        label="Category"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="business" />
        </template>
      </q-select>
      <q-select
        class="field"
        dense
        outlined
        v-model="workflow.subCategory"
        :options="workflowVerticals"
        label="Sub Category"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="category" />
        </template>
      </q-select>
      <q-input
        class="field"
        dense
        outlined
        v-model="workflow.displayName"
        label="Workflow Name"
        placeholder="Workflow name"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="text_fields" />
        </template>
      </q-input>
      <q-input
        class="field"
        type="textarea"
        rows="2"
        dense
        outlined
        v-model="workflow.description"
        label="Description"
        placeholder="Description"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="text_fields" />
        </template>
      </q-input>
      <q-select
        class="field"
        dense
        use-input
        use-chips
        outlined
        multiple
        v-model="selectedModes"
        :options="workflowModes"
        label="Mode"
        :rules="[arrayRequired()]"
      >
        <template v-slot:prepend>
          <q-icon name="img:src/assets/images/mode.svg" />
        </template>
      </q-select>

      <q-file
        dense
        class="field"
        color="teal"
        outlined
        v-model="iconFile"
        label="Select Workflow Icon"
        :rules="[required()]"
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
    </q-form>
  </q-card-section>
</template>

<style lang="scss" scoped>
.field {
  padding-bottom: 4px;

  &.q-field--error {
    padding-bottom: 24px;
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { useFile } from 'src/common/composables/useFile';
import { Workflow } from 'src/common/types/Workflow';
import { required, arrayRequired } from 'src/common/utils/validations';
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
  setup(props, { expose }) {
    const workflow = ref<Workflow>(props.details);
    const { file: iconFile } = useFile(
      workflow.value.iconFileName,
      (filename, data) => {
        workflow.value.icon = data;
        workflow.value.iconFileName = filename;
      }
    );
    const formRef = ref();
    const selectedModes = computed({
      get: () => (workflow.value.mode ? workflow.value.mode.split(',') : []),
      set: (modes) => {
        workflow.value.mode = modes.join(',');
      },
    });

    expose({ form: formRef });

    return {
      workflowCategories,
      workflowVerticals,
      workflowModes,
      workflow,
      selectedModes,
      iconFile,
      formRef,
      required,
      arrayRequired,
    };
  },
});
</script>
