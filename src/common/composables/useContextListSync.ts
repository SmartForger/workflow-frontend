/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, Ref, watch } from 'vue';

export const useContextListSync = <T extends { id: string }>(
  state: Ref<{ context: { list: T[] } }>,
  setList: (data: T[]) => void,
  emit: (event: any, ...args: any[]) => void
) => {
  const list = computed({
    get: () => state.value.context.list,
    set: (val) => setList(val),
  });

  watch(
    () => state.value.context.list,
    (newVal) => {
      emit('update', newVal);
    }
  );

  return list;
};
