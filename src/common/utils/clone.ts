import { cloneDeep } from 'lodash';
import { v4 as uuid } from 'uuid';
import { Workflow } from '../types/Workflow';
import { WorkflowEvent } from '../types/WorkflowEvent';
import { WorkflowLayout } from '../types/WorkflowLayout';
import { WorkflowStep } from '../types/WorkflowStep';

export const cloneWorkflow = (w: Workflow, idMap?: Map<string, string>) => {
  const newWorkflow = cloneEntity(w, idMap);

  if (idMap) {
    w.steps.forEach((s) => {
      idMap.set(s.id, `new_${uuid()}`);
    });
  }

  newWorkflow.steps = w.steps.map((step) => cloneWorkflowStep(step, idMap));

  return newWorkflow;
};

export const cloneWorkflowStep = (s: WorkflowStep, idMap?: Map<string, string>) => {
  const newStep = cloneEntity(s, idMap);

  newStep.events = s.events.map((e) => cloneWorkflowEvent(e, idMap));
  newStep.layouts = s.layouts.map((l) => cloneWorkflowLayout(l, idMap));
  newStep.widgets = s.widgets.map((w) => cloneEntity(w, idMap));

  return newStep;
};

export const cloneWorkflowEvent = (e: WorkflowEvent, idMap?: Map<string, string>) => {
  const newEvent = cloneDeepEntity(e, idMap);

  if (newEvent.target) {
    newEvent.target.id = idMap?.get(newEvent.target.id) || '';
  }

  newEvent.conditions = e.conditions.map((c) => cloneEntity(c, idMap));
  newEvent.actions = e.actions.map((action) => cloneEntity(action, idMap));

  return newEvent;
};

export const cloneWorkflowLayout = (l: WorkflowLayout, idMap?: Map<string, string>) => {
  const newLayout = cloneEntity(l, idMap);
  newLayout.widgets = l.widgets.map((w) => cloneEntity(w, idMap));
  return newLayout;
};

export const cloneEntity = <T extends { id: string }>(e: T, idMap?: Map<string, string>) => {
  const newId = idMap?.get(e.id) || `new_${uuid()}`;
  idMap?.set(e.id, newId);

  return {
    ...e,
    id: newId,
  };
};

export const cloneDeepEntity = <T extends { id: string }>(e: T, idMap?: Map<string, string>) => {
  const cloned = cloneDeep(e);
  cloned.id = idMap?.get(e.id) || `new_${uuid()}`;
  idMap?.set(e.id, cloned.id);
  return cloned;
};
