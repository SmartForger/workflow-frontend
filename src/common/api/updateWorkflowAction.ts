import gql from 'graphql-tag';
import { WorkflowAction } from '../types/WorkflowAction';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

const UpdateWorkflowGQL = gql`
  mutation UpdateWorkflowAction(
    $id: String!
    $type: String
    $name: String
    $code: String
    $content: String
    $components: [String!]
  ) {
    action: updateWorkflowAction(
      workflowActionInput: {
        id: $id
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

export const updateWorkflowAction = (action: WorkflowAction): Promise<WorkflowAction> =>
  isNewID(action.id)
    ? rejectParentRequired(`The workflow is not saved in DB: ${action.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowGQL,
          variables: action,
        })
        .then((response) => response.data.action);
