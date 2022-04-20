import gql from 'graphql-tag';
import { WorkflowEvent } from '../types/WorkflowEvent';
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

export const updateWorkflowEvent = (
  event: WorkflowEvent
): Promise<WorkflowEvent> =>
  isNewID(event.id)
    ? rejectParentRequired(`The event is not saved in DB: ${event.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowEventGQL,
          variables: event,
        })
        .then((response) => response.data.event);
