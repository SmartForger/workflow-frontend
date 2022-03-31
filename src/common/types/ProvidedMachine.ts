import { Ref } from 'vue';
import {
  AnyEventObject,
  Event,
  EventData,
  SCXML,
  SingleOrArray,
  State,
} from 'xstate';

export type MachineState<T> = Ref<State<T>>;

export type MachineSend<T> = (
  ev: SCXML.Event<AnyEventObject> | SingleOrArray<Event<AnyEventObject>>,
  payload?: EventData
) => MachineState<T>;

export type ProvidedMachine<T> = {
  state: MachineState<T>;
  send: MachineSend<T>;
};
