/* eslint-disable @typescript-eslint/no-explicit-any */
import { sortBy } from 'lodash';
import { AnyEventObject, createMachine } from 'xstate';
import { Workflow } from '../../types/Workflow';
import { WorkflowEvent } from '../../types/WorkflowEvent';
import { WorkflowEventCondition } from '../../types/WorkflowEventCondition';
import { WorkflowStep } from '../../types/WorkflowStep';
import actions from './actions';
import guards from './guards';

const createStepJson = (step: WorkflowStep) => {
  const result: Record<string, any> = {};

  if (step.events.length > 0) {
    result.on = step.events.reduce(
      (events, ev) => ({
        ...events,
        [ev.name]: createEventJson(ev),
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

const createEventJson = (ev: WorkflowEvent) => {
  const result: Record<string, any> = {
    target: ev.target?.name,
  };

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

export const createWorkflowMachine = (workflow: Workflow) => {
  const initialStep = workflow.steps[0];

  return createMachine<any, AnyEventObject>(
    {
      id: workflow.id,
      context: {},
      initial: initialStep?.name || '',
      states: workflow.steps.reduce(
        (states, step) => ({
          ...states,
          [step.name]: createStepJson(step),
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
