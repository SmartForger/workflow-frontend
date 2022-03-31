<template>
  <q-btn-toggle
    v-model="selected"
    push
    glossy
    toggle-color="teal"
    :options="toggleOptions"
  >
    <template v-slot:[opt.value] :key="opt.value" v-for="opt in options">
      <q-icon :name="opt.icon"></q-icon>
      <q-tooltip>{{ opt.tooltip }}</q-tooltip>
    </template>
  </q-btn-toggle>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useModelWrapper } from 'src/common/composables/useModelWrapper';

interface ToggleOption {
  value: string;
  tooltip: string;
  icon: string;
}

export default defineComponent({
  name: 'IconToggle',

  props: {
    modelValue: String,
    options: {
      type: Array as () => ToggleOption[],
      required: true,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const toggleOptions = computed(() =>
      props.options.map((opt) => ({
        label: '',
        value: opt.value,
        slot: opt.value,
      }))
    );

    return {
      toggleOptions,
      selected: useModelWrapper(props, emit),
    };
  },
});
</script>
