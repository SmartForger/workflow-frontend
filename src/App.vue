<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { inspect } from '@xstate/inspect';

inspect({
  iframe: false, // open in new window
});

export default defineComponent({
  name: 'App',
});
</script>
