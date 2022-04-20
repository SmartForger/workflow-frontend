import gql from 'graphql-tag';
import { omit } from 'lodash';
import { Workflow } from '../types/Workflow';
import client from './client';
import { createWorkflowStep } from './createWorkflowStep';

const CreateWorkflowGQL = gql`
  mutation CreateWorkflow(
    $category: String!
    $subCategory: String!
    $name: String!
    $displayName: String!
    $description: String!
    $icon: String!
    $iconFileName: String!
  ) {
    workflow: createWorkflow(
      workflowInput: {
        category: $category
        subCategory: $subCategory
        name: $name
        displayName: $displayName
        description: $description
        icon: $icon
        iconFileName: $iconFileName
      }
    ) {
      ...workflowFields
    }
  }

  fragment workflowFields on Workflow {
    id
    name
    category
    subCategory
    name
    displayName
    description
    icon
    iconFileName
  }
`;

const createWorkflowObject = (workflow: Workflow): Promise<Workflow> =>
  client
    .mutate({
      mutation: CreateWorkflowGQL,
      variables: omit(workflow, ['id', 'mode', 'steps']),
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
