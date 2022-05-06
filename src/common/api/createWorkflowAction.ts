import gql from 'graphql-tag';
import { omit } from 'lodash';
import { WorkflowAction } from '../types/WorkflowAction';
import client from './client';

const CreateWorkflowEventGQL = gql`
  mutation CreateWorkflowAction(
    $type: String!
    $name: String!
    $code: String!
    $content: String!
    $components: [String!]!
  ) {
    action: createWorkflowAction(
      workflowActionInput: {
        type: $type
        name: $name
        code: $code
        content: $content
        components: $components
      }
    ) {
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
`;

export const createWorkflowAction = (action: WorkflowAction): Promise<WorkflowAction> =>
  client
    .mutate({
      mutation: CreateWorkflowEventGQL,
      variables: omit(action, ['id']),
    })
    .then((response) => response.data.action);
