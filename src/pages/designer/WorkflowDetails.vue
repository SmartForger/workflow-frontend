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
      <workflow-info :details="details"></workflow-info>
      <workflow-steps></workflow-steps>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { Workflow } from 'src/common/types/Workflow';
import WorkflowInfo from './WorkflowInfo.vue';
import WorkflowSteps from './WorkflowSteps.vue';

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
            description: '',
            mode: '',
            displayName: '',
          }
    );

    const goBack = () => {
      emit('back');
    };

    const save = () => {
      if (!props.editing) {
        details.value.name = details.value.displayName
          .replaceAll(' ', '_')
          .toLowerCase();
      }
      emit('save', details.value);
    };

    return {
      details,
      goBack,
      save,
    };
  },
});
</script>
