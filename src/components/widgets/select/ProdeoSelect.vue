<template>
  <q-select
    class="pvn-field"
    emit-value
    v-model="model"
    :options="options"
    :label="details.name"
    :outlined="details.extra.outlined"
    :dense="details.extra.dense"
    :filled="details.extra.filled"
    :multiple="details.extra.multiple"
    :rules="rules"
  >
    <template v-slot:prepend v-if="details.iconFileName || details.icon">
      <icon-renderer
        :icon="details.icon"
        :iconFileName="details.iconFileName"
        size="32px"
      ></icon-renderer>
    </template>
    <template v-slot:selected> {{ selectedLabel }} </template>
  </q-select>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { keyBy } from 'lodash';
import { WorkflowWidget } from 'src/common/types/WorkflowWidget';
import { useModelWrapper } from 'src/common/composables/useModelWrapper';
import { SelectOption } from 'src/common/types/SelectOption';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: false,
    },
    details: {
      type: Object as PropType<WorkflowWidget>,
      required: true,
    },
    rules: {
      type: Array,
    },
  },
  setup(props, { emit }) {
    const model = useModelWrapper(props, emit, '');
    // Dummy data
    const options: SelectOption[] = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
    ];
    const optionsByValue = keyBy(options, 'value');
    const selectedLabel = computed(() =>
      props.modelValue && optionsByValue[props.modelValue]
        ? optionsByValue[props.modelValue].label
        : ''
    );

    return { model, options, selectedLabel };
  },
});
</script>
