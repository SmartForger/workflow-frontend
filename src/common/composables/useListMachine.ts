import { useMachine } from '@xstate/vue';
import { computed } from 'vue';
import { createListViewMachine, CreateListViewMachineParams } from '../machines/list-view.machine';
import { BaseItem } from '../types/BaseItem';

interface UseListMachineParams<TItem> extends CreateListViewMachineParams<TItem> {
  onUpdate?: () => void;
}

export const useListMachine = <TItem extends BaseItem>(params: UseListMachineParams<TItem>) => {
  const machine = createListViewMachine<TItem>(params);
  const { state, send } = useMachine(machine, { devTools: true });

  const addItem = () => {
    send({ type: 'ADD' });
  };

  const editItem = (item: TItem) => {
    send({ type: 'EDIT', item });
  };

  const deleteItem = (item: TItem) => {
    send({ type: 'DELETE', id: item.id });
    params.onUpdate && params.onUpdate();
  };

  const save = () => {
    send({ type: 'SAVE' });
    params.onUpdate && params.onUpdate();
  };

  const cancel = () => {
    send({ type: 'BACK' });
  };

  const update = (data: Partial<TItem>) => {
    if (!data) {
      return;
    }

    send({ type: 'UPDATE', payload: data });
    params.onUpdate && params.onUpdate();
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
