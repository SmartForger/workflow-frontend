import { useMachine } from '@xstate/vue';
import { createListViewMachine } from '../machines/list-view.machine';
import { BaseItem } from '../types/BaseItem';

export const useListMachine = <TItem extends BaseItem>(
  id: string,
  creatEmptyItem: () => TItem
) => {
  const machine = createListViewMachine<TItem>(id, creatEmptyItem);
  const { state, send } = useMachine(machine, { devTools: true });

  const addItem = () => {
    send({ type: 'ADD' });
  };

  const editItem = (item: TItem) => {
    send({ type: 'EDIT', item });
  };

  const deleteItem = (item: TItem) => {
    send({ type: 'DELETE', item });
  };

  const save = () => {
    send({ type: 'SAVE' });
  };

  const cancel = () => {
    send({ type: 'BACK' });
  };

  const update = (data: Partial<TItem>) => {
    if (!data) {
      return;
    }

    send({ type: 'UPDATE', payload: data });
  };

  const setList = (data: TItem[]) => {
    if (!data) {
      return;
    }

    send({ type: 'SET_LIST', list: data });
  };

  const setSearch = (search: string) => {
    send({ type: 'SET_SEARCH', search });
  };

  return {
    state,
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
