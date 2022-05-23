<template>
  <div class="workflow-renderer">
    <workflow-step-renderer :machine="machine"></workflow-step-renderer>
  </div>
</template>

<style lang="scss" scoped>
.workflow-renderer {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { Workflow } from 'src/common/types/Workflow';
import { useWorkflowMachine } from 'src/common/composables/useWorkflowMachine';
import WorkflowStepRenderer from '../renderer/WorkflowStepRenderer.vue';

export default defineComponent({
  components: { WorkflowStepRenderer },
  props: {
    workflow: {
      type: Object as PropType<Workflow>,
      required: true,
    },
    currentStep: String,
  },
  setup(props) {
    const machine = useWorkflowMachine(props.workflow, props.currentStep);
    return { machine };
  },
});
</script>
