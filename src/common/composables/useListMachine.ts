import { useMachine } from '@xstate/vue';
import { intersection, defaultsDeep, keys } from 'lodash';
import { computed } from 'vue';
import { createListViewMachine, CreateListViewMachineParams } from '../machines/list-view.machine';
import { BaseItem } from '../types/BaseItem';
import { ItemOrder } from '../types/ItemOrder';

interface UseListMachineParams<TItem> extends CreateListViewMachineParams<TItem> {
  onUpdate?: () => void;
  updateWhen?: {
    detailsView?: boolean;
    fieldsToUpdate?: string[];
    save?: boolean;
    cancel?: boolean;
    delete?: boolean;
    reorder?: boolean;
  };
}

export const useListMachine = <TItem extends BaseItem>(params: UseListMachineParams<TItem>) => {
  params = defaultsDeep(params, {
    updateWhen: {
      save: true,
      delete: true,
      fieldsToUpdate: [],
    },
  });

  const machine = createListViewMachine<TItem>(params);
  const { state, send } = useMachine(machine, { devTools: true });

  const addItem = () => {
    send({ type: 'ADD' });
    if (params.onUpdate && params.updateWhen?.detailsView) {
      params.onUpdate();
    }
  };

  const duplicateItem = (item: TItem) => {
    send({ type: 'DUPLICATE', item });
    if (params.onUpdate && params.updateWhen?.detailsView) {
      params.onUpdate();
    }
  };

  const editItem = (item: TItem) => {
    send({ type: 'EDIT', item });
    if (params.onUpdate && params.updateWhen?.detailsView) {
      params.onUpdate();
    }
  };

  const deleteItem = (item: TItem) => {
    send({ type: 'DELETE', id: item.id });
    if (params.updateWhen?.delete && params.onUpdate) {
      params.onUpdate();
    }
  };

  const save = () => {
    send({ type: 'SAVE' });
    if (params.updateWhen?.save && params.onUpdate) {
      params.onUpdate();
    }
  };

  const cancel = () => {
    send({ type: 'BACK' });
    if (params.onUpdate && params.updateWhen?.cancel) {
      params.onUpdate();
    }
  };

  const update = (data: Partial<TItem>) => {
    if (!data) {
      return;
    }

    send({ type: 'UPDATE', payload: data });
    if (params.onUpdate && intersection(keys(data), params.updateWhen?.fieldsToUpdate).length > 0) {
      params.onUpdate();
    }
  };

  const orderItems = (orders: ItemOrder[]) => {
    send({ type: 'REORDER', orders });
    if (params.onUpdate && params?.updateWhen?.reorder) {
      params.onUpdate();
    }
  };

  const setList = (data: TItem[]) => {
    if (!data) {
      return;
    }

    send({ type: 'SET_LIST', data });
  };

  const setSearch = (search: string) => {
    send({ type: 'SET_SEARCH', search });
  };

  const currentItem = computed(() => {
    const { list, selectedId } = state.value.context;
    return list.find((item) => item.id === selectedId);
  });

  const isListView = computed(
    () =>
      state.value.matches('list') ||
      state.value.matches('listRequest') ||
      state.value.matches('deleteRequest') ||
      state.value.matches('reorderRequest')
  );

  return {
    state,
    currentItem,
    isListView,
    send,
    addItem,
    editItem,
    duplicateItem,
    deleteItem,
    orderItems,
    save,
    cancel,
    update,
    setList,
    setSearch,
  };
};
