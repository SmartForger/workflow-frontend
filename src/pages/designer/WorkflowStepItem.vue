<template>
  <q-item clickable v-ripple>
    <q-item-section side>
      <q-icon class="handle" name="drag_indicator"></q-icon>
    </q-item-section>

    <q-item-section side>
      <q-avatar square>
        <img :src="details.icon" />
      </q-avatar>
    </q-item-section>

    <q-item-section> {{ details.displayName }} </q-item-section>

    <q-item-section side>
      <q-icon name="edit" @click.prevent="emit('edit', details)"></q-icon>
    </q-item-section>

    <q-item-section side>
      <q-icon name="delete" @click.prevent="emit('delete', details)"></q-icon>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { WorkflowStep } from 'src/common/types/WorkflowStep';

export default defineComponent({
  props: {
    details: {
      type: Object as () => WorkflowStep,
      required: true,
    },
  },
  emits: ['select', 'edit', 'delete'],
  setup(props, { emit }) {
    return { emit };
  },
});
</script>
