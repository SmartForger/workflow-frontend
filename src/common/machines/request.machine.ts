import { createMachine, assign } from 'xstate';

export interface RequestMachineContext<T> {
  data: T | null;
  error: unknown;
}

export const createRequestMachine = <T, TParams = any>(
  id: string,
  request: (data?: TParams) => Promise<T>
) =>
  createMachine<RequestMachineContext<T>>({
    id,
    context: {
      data: null,
      error: null,
    },
    initial: 'idle',
    states: {
      idle: {
        on: {
          REQUEST: 'loading',
        },
      },
      loading: {
        invoke: {
          src: (context, event) => request(event.payload),
          onDone: {
            target: 'success',
            actions: assign({
              data: (context, event) => event.data,
            }),
          },
          onError: {
            target: 'failed',
            actions: assign({
              error: (context, event) => event.data,
            }),
          },
        },
      },
      success: {
        type: 'final',
        data: {
          data: (context: RequestMachineContext<T>) => context.data,
        },
      },
      failed: {
        type: 'final',
        data: {
          error: (context: RequestMachineContext<T>) => context.error,
        },
      },
    },
  });
