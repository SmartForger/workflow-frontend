<template>
  <div class="q-pa-sm">
    <q-form @submit="save">
      <q-input
        class="field"
        dense
        outlined
        label="Step Name"
        placeholder="Enter step name"
        v-model="step.displayName"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="img:src/assets/images/input_text.svg" />
        </template>
      </q-input>

      <q-input
        class="field"
        type="textarea"
        rows="2"
        dense
        outlined
        v-model="step.description"
        label="Step Description"
        placeholder="Enter step description"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="img:src/assets/images/input_text.svg" />
        </template>
      </q-input>

      <q-file
        class="field"
        color="teal"
        outlined
        dense
        label="Select Step Icon"
        v-model="iconFile"
        :rules="[required()]"
      >
        <template v-slot:prepend>
          <q-icon name="image" />
        </template>
        <template v-slot:append>
          <q-avatar square v-if="step.icon">
            <img :src="step.icon" />
          </q-avatar>
        </template>
      </q-file>

      <q-list bordered>
        <workflow-step-widgets></workflow-step-widgets>
        <workflow-step-events></workflow-step-events>
        <workflow-step-layouts></workflow-step-layouts>
      </q-list>

      <q-btn
        class="q-mt-md"
        type="submit"
        label="Save"
        icon="save"
        color="primary"
        outline
      ></q-btn>
    </q-form>
  </div>
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
import { defineComponent, ref } from 'vue';
import { WorkflowStep } from 'src/common/types/WorkflowStep';
import { useFile } from 'src/common/composables/useFile';
import { required } from 'src/common/utils/validations';
import WorkflowStepWidgets from './WorkflowStepWidgets.vue';
import WorkflowStepEvents from './WorkflowStepEvents.vue';
import WorkflowStepLayouts from './WorkflowStepLayouts.vue';

export default defineComponent({
  components: {
    WorkflowStepWidgets,
    WorkflowStepEvents,
    WorkflowStepLayouts,
  },
  props: {
    details: {
      type: Object as () => WorkflowStep,
    },
  },
  setup(props, { emit }) {
    const step = ref<WorkflowStep>(
      props.details
        ? { ...props.details }
        : {
            id: new Date().getTime(),
            name: '',
            displayName: '',
            description: '',
            icon: '',
            iconFileName: '',
            widgets: [],
            events: [],
            layouts: [],
          }
    );
    const { file: iconFile } = useFile(
      step.value.iconFileName,
      (filename, data) => {
        step.value.iconFileName = filename;
        step.value.icon = data;
      }
    );

    const save = () => {
      emit('save', step.value);
    };

    return {
      step,
      save,
      iconFile,
      required,
    };
  },
});
</script>
