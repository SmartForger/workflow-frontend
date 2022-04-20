import gql from 'graphql-tag';
import { omit } from 'lodash';
import { WorkflowEvent } from '../types/WorkflowEvent';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

const CreateWorkflowEventGQL = gql`
  mutation CreateWorkflowEvent(
    $name: String!
    $description: String!
    $action: String!
    $condition: String!
    $stepId: String!
  ) {
    event: createWorkflowEvent(
      eventInput: {
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

export const createWorkflowEvent = (
  event: WorkflowEvent
): Promise<WorkflowEvent> =>
  isNewID(event.stepId)
    ? rejectParentRequired('stepId is required')
    : client
        .mutate({
          mutation: CreateWorkflowEventGQL,
          variables: omit(event, ['id']),
        })
        .then((response) => response.data.event);
