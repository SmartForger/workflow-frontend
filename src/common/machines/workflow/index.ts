/* eslint-disable @typescript-eslint/no-explicit-any */
import { sortBy } from 'lodash';
import { AnyEventObject, createMachine } from 'xstate';
import { Workflow } from '../../types/Workflow';
import { WorkflowEvent } from '../../types/WorkflowEvent';
import { WorkflowEventCondition } from '../../types/WorkflowEventCondition';
import { WorkflowStep } from '../../types/WorkflowStep';
import actions from './actions';
import guards from './guards';

const createStepJson = (step: WorkflowStep, stepNames: Record<string, string>) => {
  const result: Record<string, any> = {};

  if (step.events.length > 0) {
    result.on = step.events.reduce(
      (events, ev) => ({
        ...events,
        [ev.name]: createEventJson(ev, stepNames),
      }),
      {
        update: {
          actions: ['updateData'],
        },
      }
    );
  }

  result.meta = {
    name: step.name,
    icon: step.icon,
    iconFileName: step.iconFileName,
    widgets: sortBy(step.widgets, 'order'),
    layouts: step.layouts,
    events: step.events,
  };

  return result;
};

const createEventJson = (ev: WorkflowEvent, stepNames: Record<string, string>) => {
  const result: Record<string, any> = {};

  if (ev.target) {
    result.target = stepNames[ev.target.id];
  }

  if (ev.actions.length > 0) {
    result.actions = ['handleAction'];
  }

  if (ev.conditions.length > 0) {
    result.cond = {
      type: 'checkCondition',
      filters: ev.conditions.map((cond) => getFilter(cond)),
    };
  }

  return result;
};

const getFilter = (cond: WorkflowEventCondition) => {
  let filter = {};
  try {
    filter = JSON.parse(cond.filterJson);
  } catch {}

  return filter;
};

export const createWorkflowMachine = (workflow: Workflow, currentStep?: string) => {
  const steps = sortBy(workflow.steps, 'order');
  const initialStep = currentStep || steps[0]?.name || '';

  const stepNames = steps.reduce((names, step) => ({ ...names, [step.id]: step.name }), {});

  return createMachine<any, AnyEventObject>(
    {
      id: workflow.id,
      context: {},
      initial: initialStep,
      states: steps.reduce(
        (states, step) => ({
          ...states,
          [step.name]: createStepJson(step, stepNames),
        }),
        {}
      ),
    },
    {
      ...actions,
      ...guards,
    }
  );
};
