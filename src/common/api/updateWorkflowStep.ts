import gql from 'graphql-tag';
import { omit } from 'lodash';
import { WorkflowStep } from '../types/WorkflowStep';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

const UpdateWorkflowEventGQL = gql`
  mutation UpdateWorkflowEvent(
    $id: String!
    $name: String
    $description: String
    $action: String
    $condition: String
    $stepId: String
  ) {
    event: updateWorkflowEvent(
      eventInput: {
        id: $id
        name: $name
        description: $description
        action: $action
        condition: $condition
        stepId: $stepId
      }
    ) {
      ...eventFields
    }
  }

  fragment eventFields on WorkflowEvent {
    id
    name
    description
    action
    condition
  }
`;

export const updateWorkflowStep = (step: WorkflowStep): Promise<WorkflowStep> =>
  isNewID(step.id)
    ? rejectParentRequired(`The step is not saved in DB: ${step.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowEventGQL,
          variables: omit(step, ['widgets', 'events', 'layouts']),
        })
        .then((response) => ({ ...step, ...response.data.step }));
