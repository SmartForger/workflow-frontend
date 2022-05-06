<template>
  <q-select
    class="pvn-field"
    v-model="model"
    :options="options"
    :rules="rules"
    :label="label"
    outlined
    emit-value
    multiple
    use-chips
    use-input
  >
    <template v-slot:prepend>
      <q-icon :name="icon" v-if="icon" />
    </template>
    <template v-slot:selected>
      <q-chip :key="i" v-for="(label, i) in selectedLabels">
        {{ label }}
      </q-chip>
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { SelectOption } from 'src/common/types/SelectOption';
import { arrayRequired } from 'src/common/utils/validations';
import { keyBy } from 'lodash';

export default defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
    },
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },
    required: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue || [],
      set: (val: string[]) => {
        emit('update:modelValue', val);
      },
    });
    const rules = computed(() => (props.required ? [arrayRequired()] : []));
    const optionsByValue = keyBy(props.options, 'value');
    const selectedLabels = computed(() => {
      if (!props.modelValue) {
        return [];
      }

      return props.modelValue
        .map((v: string) => (optionsByValue[v] || {}).label)
        .filter((label: string) => !!label);
    });

    return { model, rules, selectedLabels };
  },
});
</script>
