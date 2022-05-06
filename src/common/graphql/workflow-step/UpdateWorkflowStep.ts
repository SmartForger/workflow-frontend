import gql from 'graphql-tag';
import workflowStepFields from '../fragments/workflowStepFields';

export default gql`
  mutation UpdateWorkflowStep(
    $id: String!
    $name: String
    $description: String
    $icon: String
    $iconFileName: String
    $workflowId: String
  ) {
    step: updateWorkflowStep(
      stepInput: {
        id: $id
        name: $name
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
