import gql from 'graphql-tag';
import workflowStepFields from '../fragments/workflowStepFields';

export default gql`
  mutation CreateWorkflowStep(
    $name: String!
    $description: String
    $icon: String
    $iconFileName: String
    $workflowId: String!
    $order: Int
  ) {
    step: createWorkflowStep(
      stepInput: {
        name: $name
        description: $description
        icon: $icon
        iconFileName: $iconFileName
        workflowId: $workflowId
        order: $order
      }
    ) {
      ...workflowStepFields
    }
  }
  ${workflowStepFields}
`;
