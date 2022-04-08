<template>
  <q-expansion-item group="settings" dense expand-separator default-closed>
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="timeline" />
      </q-item-section>

      <q-item-section> Events </q-item-section>

      <q-item-section side>
        <q-btn flat round icon="add"></q-btn>
      </q-item-section>
    </template>

    <div>No events</div>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
