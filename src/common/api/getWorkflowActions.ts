import gql from 'graphql-tag';
import { WorkflowAction } from '../types/WorkflowAction';
import client from './client';

export const getWorkflowActions = (): Promise<WorkflowAction[]> =>
  client
    .query({
      query: gql`
        query GetWorkflowActions {
          actions: workflowActions {
            ...actionFields
          }
        }
        fragment actionFields on WorkflowAction {
          id
          type
          name
          code
          content
          components
        }
      `,
    })
    .then((response) => response.data.actions);
