import { AnyEventObject, assign, createMachine } from 'xstate';

export interface ListViewContext<TItem extends { id: string | number }> {
  list: TItem[];
  selected: TItem | null;
  search: string;
}

export const createListViewMachine = <TItem extends { id: string | number }>(
  id: string
) => {
  const initialContext: ListViewContext<TItem> = {
    list: [],
    selected: null,
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
              actions: 'deselectItem',
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
          },
        },
        add: {
          on: {
            BACK: 'list',
            SAVE: {
              target: 'list',
              actions: ['addItem'],
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
          selected: (_context, ev) => ev.item,
        }),
        deselectItem: assign<ListViewContext<TItem>, AnyEventObject>({
          selected: () => null,
        }),
        setSearch: assign({
          search: (_context, ev) => ev.search,
        }),
        addItem: assign<ListViewContext<TItem>, AnyEventObject>({
          list: (context, ev) => context.list.concat(ev.item),
          selected: () => null,
        }),
        updateItem: assign<ListViewContext<TItem>, AnyEventObject>({
          list: (context, ev) =>
            context.list.map((item) =>
              item.id === ev.item.id ? ev.item : item
            ),
          selected: null,
        }),
        deleteItem: assign<ListViewContext<TItem>, AnyEventObject>({
          list: (context, ev) =>
            context.list.filter((item) => item.id !== ev.item.id),
        }),
      },
    }
  );
};
