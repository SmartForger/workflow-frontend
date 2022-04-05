<template>
  <div>
    <q-toolbar class="bg-secondary text-white">
      <q-btn round flat icon="arrow_back" @click="goBack()"></q-btn>
      <q-toolbar-title class="col">
        {{ editing ? 'Edit workflow' : 'Add workflow' }}
      </q-toolbar-title>
      <q-space></q-space>
      <q-btn flat icon="save" label="Save" @click="save()"></q-btn>
    </q-toolbar>

    <div class="q-pa-xs">
      <workflow-info ref="infoForm" :details="details"></workflow-info>
      <workflow-steps
        :workflow="details"
        @update:steps="updateSteps"
      ></workflow-steps>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { Workflow } from 'src/common/types/Workflow';
import WorkflowInfo from './WorkflowInfo.vue';
import WorkflowSteps from './WorkflowSteps.vue';
import { WorkflowStep } from 'src/common/types/WorkflowStep';

export default defineComponent({
  name: 'WorkflowDetails',
  components: { WorkflowInfo, WorkflowSteps },
  props: {
    editing: Boolean,
    workflow: {
      type: Object as PropType<Workflow>,
    },
  },
  setup(props, { emit }) {
    const details = ref<Workflow>(
      props.workflow
        ? { ...props.workflow }
        : {
            id: new Date().getTime(),
            name: '',
            category: '',
            subCategory: '',
            icon: '',
            iconFileName: '',
            description: '',
            mode: '',
            displayName: '',
            steps: [],
          }
    );
    const infoForm = ref();

    const goBack = () => {
      emit('back');
    };

    const save = async () => {
      const valid = await infoForm.value.form.validate();

      if (!valid) {
        return;
      }

      if (!props.editing) {
        details.value.name = details.value.displayName
          .replaceAll(' ', '_')
          .toLowerCase();
      }
      emit('save', details.value);
    };

    const updateSteps = (steps: WorkflowStep[]) => {
      details.value.steps = steps;
    };

    return {
      details,
      goBack,
      save,
      updateSteps,
      infoForm,
    };
  },
});
</script>
