import { AnyEventObject, assign, createMachine } from 'xstate';
import { BaseItem } from '../types/BaseItem';

export interface ListViewContext<TItem extends BaseItem> {
  list: TItem[];
  current: TItem | null;
  search: string;
}

export const createListViewMachine = <TItem extends BaseItem>(
  id: string,
  creatEmptyItem: () => TItem
) => {
  const initialContext: ListViewContext<TItem> = {
    list: [],
    current: null,
    search: '',
  };

  return createMachine<ListViewContext<TItem>, AnyEventObject>(
    {
      id,
      context: initialContext,
      initial: 'list',
      states: {
        list: {
          on: {
            ADD: {
              target: 'add',
              actions: 'setNewCurrentItem',
            },
            EDIT: {
              target: 'edit',
              actions: ['selectItem'],
            },
            DELETE: {
              actions: ['deleteItem'],
            },
            SET_LIST: {
              actions: ['setList'],
            },
            SET_SEARCH: {
              actions: ['setSearch'],
            },
            UPDATE: {
              actions: ['updateItemInList'],
            },
          },
        },
        add: {
          on: {
            BACK: 'list',
            SAVE: {
              target: 'list',
              actions: ['addItem'],
            },
            UPDATE: {
              actions: ['updateCurrentItem'],
            },
          },
        },
        edit: {
          on: {
            BACK: 'list',
            SAVE: {
              target: 'list',
              actions: ['updateItem'],
            },
            UPDATE: {
              actions: ['updateCurrentItem'],
            },
          },
        },
      },
    },
    {
      actions: {
        setList: assign({
          list: (_context, ev) => ev.list,
        }),
        selectItem: assign({
          current: (_context, ev) => ({ ...ev.item }),
        }),
        setNewCurrentItem: assign<ListViewContext<TItem>, AnyEventObject>({
          current: () => creatEmptyItem(),
        }),
        setSearch: assign({
          search: (_context, ev) => ev.search,
        }),
        addItem: assign<ListViewContext<TItem>, AnyEventObject>({
          list: (context) => context.list.concat(context.current as TItem),
          current: null,
        }),
        updateItem: assign<ListViewContext<TItem>, AnyEventObject>({
          list: (context) =>
            context.list.map((item) =>
              item.id === context.current?.id ? context.current : item
            ),
          current: null,
        }),
        deleteItem: assign<ListViewContext<TItem>, AnyEventObject>({
          list: (context, ev) =>
            context.list.filter((item) => item.id !== ev.item.id),
        }),
        updateCurrentItem: assign<ListViewContext<TItem>, AnyEventObject>({
          current: ({ current }, ev) => ({ ...current, ...ev.payload }),
        }),
        updateItemInList: (
          context: ListViewContext<TItem>,
          ev: AnyEventObject
        ) => {
          const { id, ...data } = ev.payload;
          const index = context.list.findIndex(item => item.id === id);
          context.list[index] = {
            ...context.list[index],
            ...data,
          };
        },
      },
    }
  );
};
