/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMachine } from '@xstate/vue';
import { computed } from 'vue';
import { createWorkflowMachine } from '../machines/workflow';
import { Workflow } from '../types/Workflow';

export const useWorkflowMachine = (workflow: Workflow, currentStep?: string) => {
  const machine = createWorkflowMachine(workflow, currentStep);
  const { state, send } = useMachine(machine, { devTools: true });

  const sendAction = (step: string) => {
    send({ type: step });
  };

  const updateData = (field: any, value: any) => {
    send({ type: 'update', field, value });
  };

  const sendEvent = (event: string) => {
    send({ type: event });
  };

  return {
    state,
    stepInfo: computed(() => {
      const id = `${machine.id}.${state.value.value}`;
      return state.value.meta[id];
    }),
    data: computed(() => state.value.context),
    sendAction,
    updateData,
    sendEvent,
  };
};
