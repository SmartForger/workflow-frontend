import gql from 'graphql-tag';
import { omit } from 'lodash';
import { WorkflowStep } from '../types/WorkflowStep';
import client from './client';

export const createWorkflowStep = (step: WorkflowStep): Promise<WorkflowStep> =>
  client
    .mutate({
      mutation: gql`
        mutation CreateWorkflowStep(
          $name: String!
          $displayName: String!
          $description: String!
          $icon: String!
          $iconFileName: String!
          $workflowId: String!
        ) {
          step: createWorkflowStep(
            stepInput: {
              name: $name
              displayName: $displayName
              description: $description
              icon: $icon
              iconFileName: $iconFileName
              workflowId: $workflowId
            }
          ) {
            ...stepFields
          }
        }

        fragment stepFields on WorkflowStep {
          id
          name
          displayName
          description
          icon
          iconFileName
        }
      `,
      variables: omit(step, ['id', 'widgets', 'events', 'layouts']),
    })
    .then((response) => ({
      ...response.data.step,
      widgets: [],
      events: [],
      layouts: [],
    }));
