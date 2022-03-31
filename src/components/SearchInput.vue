<template>
  <q-input
    v-model="searchValue"
    :placeholder="placeholder"
    :debounce="300"
    dense
    outlined
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { useModelWrapper } from 'src/common/composables/useModelWrapper';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchInput',
  props: {
    placeholder: {
      type: String,
      default: 'Search ...',
    },
    modelValue: String,
  },
  setup(props, { emit }) {
    return {
      searchValue: useModelWrapper(props, emit),
    };
  },
});
</script>
