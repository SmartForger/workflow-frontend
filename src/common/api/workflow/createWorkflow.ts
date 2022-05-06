import { omit } from 'lodash';
import CreateWorkflowGQL from 'src/common/graphql/workflow/CreateWorkflow';
import { Workflow } from '../../types/Workflow';
import client from '../client';
import { createWorkflowStep } from '../workflow-step/createWorkflowStep';

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
      return createWorkflowStep(step);
    })
  );

  return newWorkflow;
};
