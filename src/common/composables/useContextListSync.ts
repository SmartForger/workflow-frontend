/* eslint-disable @typescript-eslint/no-explicit-any */
import { sortBy } from 'lodash';
import { computed, Ref, watch } from 'vue';
import { ItemOrder } from '../types/ItemOrder';
import { OrderableItem } from '../types/OrderableItem';

export const useContextListSync = <T extends { id: string }>(
  state: Ref<{ context: { list: T[] } }>,
  emit: (event: any, ...args: any[]) => void,
  options?: {
    onReorder?: (data: ItemOrder[]) => void;
  }
) => {
  const draggableList = computed({
    get: () => sortBy(state.value.context.list, 'order'),
    set: (newList) => {
      if (options?.onReorder) {
        const orders: ItemOrder[] = newList
          .map((item: OrderableItem, i) => {
            const result = {
              id: item.id,
              order: i + 1 === item.order ? -1 : i + 1,
            };
            return result;
          })
          .filter((order) => order.order >= 0);

        options.onReorder(orders);
      }
    },
  });

  watch(
    () => state.value.context.list,
    (newVal) => {
      emit('update', newVal);
    }
  );

  return { draggableList };
};
