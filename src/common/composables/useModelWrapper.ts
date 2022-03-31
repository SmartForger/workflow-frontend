import { computed } from 'vue';

export function useModelWrapper(
  props: { modelValue: unknown },
  emit: (event: string, ...args: unknown[]) => void
) {
  return computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });
}
