import gql from 'graphql-tag';
import workflowEventFields from '../fragments/workflowEventFields';

export default gql`
  mutation UpdateWorkflowEvent(
    $id: String!
    $name: String
    $description: String
    $targetId: String
    $stepId: String
    $order: Int
  ) {
    event: updateWorkflowEvent(
      eventInput: {
        id: $id
        name: $name
        description: $description
        targetId: $targetId
        stepId: $stepId
        order: $order
      }
    ) {
      ...workflowEventFields
    }
  }
  ${workflowEventFields}
`;
