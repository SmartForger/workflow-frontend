import gql from 'graphql-tag';
import { omit } from 'lodash';
import { WorkflowStep } from '../types/WorkflowStep';
import client from './client';

export const updateWorkflowStep = (step: WorkflowStep): Promise<WorkflowStep> =>
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
      variables: omit(step, ['widgets', 'events', 'layouts']),
    })
    .then((response) => ({ ...step, ...response.data.step }));
