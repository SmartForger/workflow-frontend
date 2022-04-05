<template>
  <div class="q-pa-sm">
    <q-input
      class="q-pb-xs"
      dense
      outlined
      label="Step Name"
      placeholder="Enter step name"
      v-model="step.displayName"
    >
      <template v-slot:prepend>
        <q-icon name="img:src/assets/images/input_text.svg" />
      </template>
    </q-input>

    <q-input
      class="q-pb-xs"
      type="textarea"
      rows="2"
      dense
      outlined
      v-model="step.description"
      label="Step Description"
      placeholder="Enter step description"
    >
      <template v-slot:prepend>
        <q-icon name="img:src/assets/images/input_text.svg" />
      </template>
    </q-input>

    <q-file
      class="q-pb-xs"
      color="teal"
      outlined
      dense
      label="Select Step Icon"
      v-model="step.icon"
    >
      <template v-slot:prepend>
        <q-icon name="image" />
      </template>
      <template v-slot:append>
        <q-avatar>
          <q-icon :name="step.icon"></q-icon>
        </q-avatar>
      </template>
    </q-file>
    <q-btn
      class="q-mt-md"
      label="Save"
      icon="save"
      color="primary"
      outline
      @click="save"
    ></q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { WorkflowStep } from 'src/common/types/WorkflowStep';

export default defineComponent({
  props: {
    details: {
      type: Object as () => WorkflowStep,
      required: true,
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
            widgets: [],
            events: [],
            layouts: [],
          }
    );

    const save = () => {
      emit('save', step.value);
    };

    return {
      step,
      save,
    };
  },
});
</script>
