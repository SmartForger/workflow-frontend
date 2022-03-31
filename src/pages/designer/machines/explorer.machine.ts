import { Workflow } from 'src/common/types/Workflow';
import { assign, createMachine } from 'xstate';

export interface ExplorerContext {
  workflows: Workflow[];
  search: string;
}

const initialContext: ExplorerContext = {
  workflows: [],
  search: '',
};

export const explorerMachine = createMachine<ExplorerContext>(
  {
    id: 'explorer',
    context: initialContext,
    initial: 'list',
    states: {
      list: {
        on: {
          ADD: 'details',
          SET_LIST: {
            internal: true,
            actions: 'setList',
          },
          SET_SEARCH: {
            internal: true,
            actions: 'setSearch',
          },
        },
      },
      details: {
        on: {
          BACK: 'list',
          SAVE: 'list',
        },
      },
    },
  },
  {
    actions: {
      setList: assign((_context, ev) => ({
        workflows: ev.list,
      })),
      setSearch: assign((_context, ev) => ({
        search: ev.search,
      })),
    },
  }
);
