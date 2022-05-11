/* eslint-disable */
import { computed } from 'vue';

export function useModelWrapper(
  props: { modelValue: any },
  emit: (event: any, ...args: any[]) => void,
  defaultValue?: any
) {
  return computed({
    get: () => props.modelValue || defaultValue,
    set: (value) => {
      emit('update:modelValue', value);
    },
  });
}
