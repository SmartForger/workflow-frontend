<template>
  <div class="row justify-between align-center q-mb-md">
    <div class="text-h5">{{ title }}</div>

    <div class="text-right">
      <slot name="rightSide" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageHeader',
  props: {
    title: String,
  },
});
</script>
