import { omit } from 'lodash';
import CreateWorkflowGQL from 'src/common/graphql/workflow/CreateWorkflow';
import { Workflow } from '../../types/Workflow';
import client from '../client';
import {
  createWorkflowStepObject,
  createWorkflowStepChildren,
} from '../workflow-step/createWorkflowStep';

const createWorkflowObject = (workflow: Workflow): Promise<Workflow> =>
  client
    .mutate({
      mutation: CreateWorkflowGQL,
      variables: omit(workflow, ['id', 'steps']),
    })
    .then((response) => ({ ...response.data.workflow, steps: [] }));

export const createWorkflow = async (workflow: Workflow): Promise<Workflow> => {
  const newWorkflow = await createWorkflowObject(workflow);

  newWorkflow.steps = await Promise.all(
    (workflow.steps || []).map((step) => {
      step.workflowId = newWorkflow.id;
      return createWorkflowStepObject(step);
    })
  );

  const stepIDs: Record<string, string> = {};
  workflow.steps.forEach((step, i) => {
    stepIDs[step.id] = newWorkflow.steps[i].id;
  });

  workflow.steps.forEach((step) => {
    step.id = stepIDs[step.id];
    step.events.forEach((e) => {
      if (e.target) {
        e.target.id = stepIDs[e.target.id];
      }
    });
  });

  await Promise.all(workflow.steps.map((step) => createWorkflowStepChildren(step)));
  newWorkflow.steps = workflow.steps;

  return newWorkflow;
};
