<template>
  <q-img :width="size" height="size" :src="icon" v-if="iconFileName" />
  <q-icon :size="size" :name="icon" v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: '',
    },
    iconFileName: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '32px',
    },
  },
});
</script>
