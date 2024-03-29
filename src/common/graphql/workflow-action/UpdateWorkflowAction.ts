import gql from 'graphql-tag';
import workflowActionFields from '../fragments/workflowActionFields';

export default gql`
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
      ...workflowActionFields
    }
  }
  ${workflowActionFields}
`;
