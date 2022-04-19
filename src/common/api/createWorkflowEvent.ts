import gql from 'graphql-tag';
import { omit } from 'lodash';
import { WorkflowEvent } from '../types/WorkflowEvent';
import client from './client';

export const createWorkflowEvent = (
  event: WorkflowEvent
): Promise<WorkflowEvent> =>
  client
    .mutate({
      mutation: gql`
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
      `,
      variables: omit(event, ['id']),
    })
    .then((response) => response.data.event);
