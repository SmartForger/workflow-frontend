<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as localforage from 'localforage';
import { inspect } from '@xstate/inspect';

inspect({
  iframe: false, // open in new window
});

localforage.config({
  driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
  name: 'prodeo',
  version: 1.0,
  size: 100 * 1024 * 1024, // 100 Mb
  storeName: 'prodeo', // Should be alphanumeric, with underscores.
  description: 'Prodeo local store',
});

export default defineComponent({
  name: 'App',
});
</script>
