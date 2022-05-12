import { useMachine } from '@xstate/vue';
import { intersection, defaultsDeep, keys, partialRight } from 'lodash';
import { computed } from 'vue';
import { createListViewMachine, CreateListViewMachineParams } from '../machines/list-view.machine';
import { BaseItem } from '../types/BaseItem';

interface UseListMachineParams<TItem> extends CreateListViewMachineParams<TItem> {
  onUpdate?: () => void;
  updateWhen?: {
    detailsView?: boolean;
    fieldsToUpdate?: string[];
    save?: boolean;
    cancel?: boolean;
    delete?: boolean;
  };
}

export const useListMachine = <TItem extends BaseItem>(params: UseListMachineParams<TItem>) => {
  params = defaultsDeep(params, {
    updateWhen: {
      save: true,
      cancel: true,
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

  return {
    state,
    currentItem,
    send,
    addItem,
    editItem,
    deleteItem,
    save,
    cancel,
    update,
    setList,
    setSearch,
  };
};
