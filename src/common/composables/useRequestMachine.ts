import { useMachine } from '@xstate/vue';
import { createRequestMachine } from '../machines/request.machine';

export const useRequestMachine = <T, TParams = any>({
  id,
  request,
  onDone,
}: {
  id: string;
  request: (data?: TParams) => Promise<T>;
  onDone?: (data: { data: T; error: unknown }) => void;
  auto?: boolean;
}) => {
  const machine = createRequestMachine<T, TParams>(id, request);
  const { state, send, service } = useMachine(machine, { devTools: true });

  const getResult = () => state.value.context.data;
  const getError = () => state.value.context.error;
  const isLoading = () => state.value.value === 'loading';

  service.onDone((ev) => {
    onDone && onDone(ev.data);
  });

  const sendRequest = (data?: TParams) => {
    send({ type: 'REQUEST', payload: data });
  };

  return {
    state,
    getResult,
    getError,
    isLoading,
    sendRequest,
  };
};
