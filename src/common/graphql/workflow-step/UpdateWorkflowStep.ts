import gql from 'graphql-tag';
import workflowStepFields from '../fragments/workflowStepFields';

export default gql`
  mutation UpdateWorkflowStep(
    $id: String!
    $name: String
    $displayName: String
    $description: String
    $icon: String
    $iconFileName: String
    $workflowId: String
  ) {
    step: updateWorkflowStep(
      stepInput: {
        id: $id
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
