import { AnyEventObject, assign, createMachine } from 'xstate';
import { BaseItem } from '../types/BaseItem';

export interface ListViewContext<TItem extends BaseItem> {
  list: TItem[];
  current: TItem | null;
  search: string;
  err: unknown;
}

export interface CreateListViewMachineParams<TItem> {
  id: string;
  createEmptyItem: () => TItem;
  getListRequest?: () => Promise<TItem[]>;
  createItemRequest?: (data: TItem) => Promise<TItem>;
  updateItemRequest?: (data: TItem) => Promise<TItem>;
  deleteItemRequest?: (id: string) => Promise<string>;
}

export const createListViewMachine = <TItem extends BaseItem>({
  id,
  createEmptyItem,
  getListRequest,
  createItemRequest,
  updateItemRequest,
  deleteItemRequest,
}: CreateListViewMachineParams<TItem>) => {
  const initialContext: ListViewContext<TItem> = {
    list: [],
    current: null,
    search: '',
    err: null,
  };

  return createMachine<ListViewContext<TItem>, AnyEventObject>(
    {
      id,
      context: initialContext,
      initial: 'listRequest',
      states: {
        listRequest: {
          invoke: {
            id: 'listItemsService',
            src: async (context) => {
              if (!getListRequest) {
                return context.list;
              }

              return await getListRequest();
            },
            onDone: {
              target: 'list',
              actions: ['setList'],
            },
            onError: {
              target: 'list',
              actions: ['setError'],
            },
          },
        },
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
            DELETE: 'deleteRequest',
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
        deleteRequest: {
          invoke: {
            id: 'deleteItemService',
            src: async (context, ev) => {
              if (!deleteItemRequest) {
                return ev.id;
              }

              return await deleteItemRequest(ev.id);
            },
            onDone: {
              target: 'list',
              actions: ['deleteItem'],
            },
            onError: {
              target: 'list',
              actions: ['setError'],
            },
          },
        },
        add: {
          on: {
            BACK: 'list',
            SAVE: 'addRequest',
            UPDATE: {
              actions: ['updateCurrentItem'],
            },
          },
        },
        addRequest: {
          invoke: {
            id: 'addItemService',
            src: async (context) => {
              if (!createItemRequest || !context.current) {
                return context.current;
              }

              return await createItemRequest(context.current);
            },
            onDone: {
              target: 'list',
              actions: ['addItem'],
            },
            onError: {
              target: 'list',
              actions: ['setError'],
            },
          },
        },
        edit: {
          on: {
            BACK: 'list',
            SAVE: 'editRequest',
            UPDATE: {
              actions: ['updateCurrentItem'],
            },
          },
        },
        editRequest: {
          invoke: {
            id: 'updateItemService',
            src: async (context) => {
              if (!updateItemRequest || !context.current) {
                return context.current;
              }

              return await updateItemRequest(context.current);
            },
            onDone: {
              target: 'list',
              actions: 'updateItem',
            },
            onError: {
              target: 'list',
              actions: ['setError'],
            },
          },
        },
      },
    },
    {
      actions: {
        setList: assign({
          list: (_context, ev) => ev.data,
        }),
        selectItem: assign({
          current: (_context, ev) => ({ ...ev.item }),
        }),
        setNewCurrentItem: assign<ListViewContext<TItem>, AnyEventObject>({
          current: () => createEmptyItem(),
        }),
        setSearch: assign({
          search: (_context, ev) => ev.search,
        }),
        addItem: assign<ListViewContext<TItem>, AnyEventObject>({
          list: (context, event) => context.list.concat(event.data as TItem),
          current: null,
        }),
        updateItem: assign<ListViewContext<TItem>, AnyEventObject>({
          list: (context, event) =>
            context.list.map((item) =>
              item.id === event.data.id ? event.data : item
            ),
          current: null,
        }),
        deleteItem: assign({
          list: (context, ev) =>
            context.list.filter((item) => item.id !== ev.data),
        }),
        updateCurrentItem: assign({
          current: ({ current }, ev) => ({ ...current, ...ev.payload }),
        }),
        updateItemInList: (
          context: ListViewContext<TItem>,
          ev: AnyEventObject
        ) => {
          const { id, ...data } = ev.payload;
          const index = context.list.findIndex((item) => item.id === id);
          context.list[index] = {
            ...context.list[index],
            ...data,
          };
        },
        setError: assign({
          err: (context, event) => event.data,
        }),
      },
    }
  );
};
