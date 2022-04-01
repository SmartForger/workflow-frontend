<template>
  <div class="q-pa-sm">
    <q-input
      class="q-pb-xs"
      dense
      outlined
      label="Step Name"
      placeholder="Enter step name"
      v-model="name"
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
      v-model="description"
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
      v-model="icon"
    >
      <template v-slot:prepend>
        <q-icon name="image" />
      </template>
      <template v-slot:append>
        <q-avatar>
          <q-icon :name="icon"></q-icon>
        </q-avatar>
      </template>
    </q-file>
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
  setup(props) {
    const name = ref(props.details.name);
    const description = ref(props.details.description);
    const icon = ref(props.details.icon);

    return {
      name,
      description,
      icon,
    };
  },
});
</script>
