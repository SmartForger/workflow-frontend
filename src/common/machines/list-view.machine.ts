import { AnyEventObject, assign, createMachine } from 'xstate';
import { v4 as uuid } from 'uuid';
import { BaseItem } from '../types/BaseItem';
import { ParentRequiredError } from '../utils/api-utils';
import { ItemOrder } from '../types/ItemOrder';

export interface ListViewContext<TItem extends BaseItem> {
  list: TItem[];
  original: TItem | null;
  selectedId: string;
  search: string;
  err: unknown;
}

export interface CreateListViewMachineParams<TItem> {
  id: string;
  getListRequest?: () => Promise<TItem[]>;
  createItemRequest?: (data: TItem) => Promise<TItem>;
  updateItemRequest?: (data: TItem) => Promise<TItem>;
  deleteItemRequest?: (id: string) => Promise<string>;
  orderItemsRequest?: (orders: ItemOrder[]) => Promise<{ updated: boolean }>;
}

export const createListViewMachine = <TItem extends BaseItem>({
  id,
  getListRequest,
  createItemRequest,
  updateItemRequest,
  deleteItemRequest,
  orderItemsRequest,
}: CreateListViewMachineParams<TItem>) => {
  const initialContext: ListViewContext<TItem> = {
    list: [],
    original: null,
    selectedId: '',
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
            REORDER: 'reorderRequest',
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
        reorderRequest: {
          invoke: {
            id: 'reorderItemService',
            src: async (context, ev) => {
              context.list = context.list.map((item) => {
                const order = ev.orders.find((order: ItemOrder) => order.id === item.id);
                if (order) {
                  return { ...item, order: order.order };
                }

                return item;
              });

              if (!orderItemsRequest) {
                return { updated: true };
              }

              try {
                return await orderItemsRequest(ev.orders);
              } catch (err: unknown) {
                if (err instanceof ParentRequiredError) {
                  return { updated: true };
                }

                throw err;
              }
            },
            onDone: {
              target: 'list',
            },
            onError: {
              target: 'list',
              actions: ['setError'],
            },
          },
        },
        deleteRequest: {
          invoke: {
            id: 'deleteItemService',
            src: async (_context, ev) => {
              if (!deleteItemRequest) {
                return ev.id;
              }

              try {
                return await deleteItemRequest(ev.id);
              } catch (err: unknown) {
                if (err instanceof ParentRequiredError) {
                  return ev.id;
                }

                throw err;
              }
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
            BACK: {
              target: 'list',
              actions: ['deleteSelectedItem'],
            },
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
              const currentItem = context.list.find((item) => item.id === context.selectedId);
              if (!createItemRequest || !currentItem) {
                return currentItem;
              }

              try {
                return await createItemRequest(currentItem);
              } catch (err: unknown) {
                if (err instanceof ParentRequiredError) {
                  return currentItem;
                }

                throw err;
              }
            },
            onDone: {
              target: 'list',
              actions: ['updateSelectedItem'],
            },
            onError: {
              target: 'list',
              actions: ['setError'],
            },
          },
        },
        edit: {
          on: {
            BACK: {
              target: 'list',
              actions: ['restoreOriginalItem'],
            },
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
              const currentItem = context.list.find((item) => item.id === context.selectedId);
              if (!updateItemRequest || !currentItem) {
                return currentItem;
              }

              try {
                return await updateItemRequest(currentItem);
              } catch (err: unknown) {
                if (err instanceof ParentRequiredError) {
                  return currentItem;
                }

                throw err;
              }
            },
            onDone: {
              target: 'list',
              actions: 'updateSelectedItem',
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
          original: (_context, ev) => ({ ...ev.item }),
          selectedId: (_context, ev) => ev.item.id,
        }),
        setNewCurrentItem: (context) => {
          const newId = `new_${uuid()}`;
          context.list.push({
            id: newId,
          } as TItem);
          context.original = null;
          context.selectedId = newId;
        },
        setSearch: assign({
          search: (_context, ev) => ev.search,
        }),
        updateSelectedItem: (context, ev) => {
          const index = context.list.findIndex((item) => item.id === context.selectedId);
          if (index >= 0) {
            context.list[index] = ev.data;
          }
          context.original = null;
          context.selectedId = '';
        },
        deleteItem: assign({
          list: (context, ev) => context.list.filter((item) => item.id !== ev.data),
        }),
        deleteSelectedItem: (context) => {
          context.list = context.list.filter((item) => item.id !== context.selectedId);
          context.selectedId = '';
        },
        restoreOriginalItem: (context) => {
          const index = context.list.findIndex((item) => item.id === context.selectedId);
          if (index >= 0 && context.original) {
            context.list[index] = context.original;
          }
        },
        updateCurrentItem: (context, ev) => {
          const index = context.list.findIndex((item) => item.id === context.selectedId);
          if (index >= 0) {
            context.list[index] = {
              ...context.list[index],
              ...ev.payload,
            };
          }
        },
        updateItemInList: (context: ListViewContext<TItem>, ev: AnyEventObject) => {
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
