import { useMachine } from '@xstate/vue';
import {
  createListViewMachine,
  CreateListViewMachineParams,
} from '../machines/list-view.machine';
import { BaseItem } from '../types/BaseItem';

export const useListMachine = <TItem extends BaseItem>(
  params: CreateListViewMachineParams<TItem>
) => {
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

    send({ type: 'SET_LIST', data });
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
