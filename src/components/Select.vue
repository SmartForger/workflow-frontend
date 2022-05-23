<template>
  <q-select
    class="pvn-field"
    outlined
    dense
    emit-value
    v-model="model"
    :options="options"
    :label="label"
    :rules="rules"
  >
    <template v-slot:prepend>
      <q-icon :name="icon" v-if="icon" />
    </template>
    <template v-slot:selected> {{ selectedLabel }} </template>
  </q-select>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { SelectOption } from 'src/common/types/SelectOption';
import { useModelWrapper } from 'src/common/composables/useModelWrapper';
import { required } from 'src/common/utils/validations';
import { keyBy } from 'lodash';

export default defineComponent({
  name: 'SelectComponent',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },
    icon: {
      type: String,
    },
    required: {
      type: Boolean,
    },
    label: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = useModelWrapper(props, emit, '');
    const optionsByValue = keyBy(props.options, 'value');
    const selectedLabel = computed(() =>
      props.modelValue && optionsByValue[props.modelValue]
        ? optionsByValue[props.modelValue].label
        : ''
    );
    const rules = props.required ? [required()] : [];

    return { model, rules, selectedLabel };
  },
});
</script>
