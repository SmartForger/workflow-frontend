import gql from 'graphql-tag';
import workflowStepFields from '../fragments/workflowStepFields';

export default gql`
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
      ...workflowStepFields
    }
  }
  ${workflowStepFields}
`;