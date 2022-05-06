import gql from 'graphql-tag';
import workflowActionFields from '../fragments/workflowActionFields';

export default gql`
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
      ...workflowActionFields
    }
  }
  ${workflowActionFields}
`;
