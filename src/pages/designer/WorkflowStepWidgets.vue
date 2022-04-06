<template>
  <q-expansion-item group="settings" dense expand-separator default-closed>
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar icon="img:src/assets/images/widgets.svg" />
      </q-item-section>

      <q-item-section> Widgets </q-item-section>

      <q-item-section side>
        <q-btn flat round icon="add"></q-btn>
      </q-item-section>
    </template>

    <div>No widgets</div>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
