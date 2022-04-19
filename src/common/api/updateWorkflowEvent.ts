import gql from 'graphql-tag';
import { WorkflowEvent } from '../types/WorkflowEvent';
import client from './client';

export const updateWorkflowEvent = (
  event: WorkflowEvent
): Promise<WorkflowEvent> =>
  client
    .mutate({
      mutation: gql`
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
      `,
      variables: event,
    })
    .then((response) => response.data.event);
