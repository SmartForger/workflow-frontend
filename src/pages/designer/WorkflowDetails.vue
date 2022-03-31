<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn round flat icon="arrow_back" @click="goBack()"></q-btn>
      <q-toolbar-title class="col">
        {{ hasWorkflow ? 'Edit workflow' : 'Add workflow' }}
      </q-toolbar-title>
      <q-space></q-space>
      <q-btn flat icon="save" label="Save" @click="save()"></q-btn>
    </q-toolbar>

    <div class="q-pa-xs">
      Workflow Details
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { Workflow } from 'src/common/types/Workflow';

export default defineComponent({
  name: 'WorkflowDetails',
  props: {
    workflow: {
      type: Object as PropType<Workflow>,
    },
  },
  setup(props, { emit }) {
    const hasWorkflow = computed(() => !!props.workflow);

    const goBack = () => {
      emit('back');
    };

    const save = () => {
      emit('save');
    };

    return {
      hasWorkflow,
      goBack,
      save,
    };
  },
});
</script>
