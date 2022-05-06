import gql from 'graphql-tag';
import workflowEventFields from '../fragments/workflowEventFields';

export default gql`
  mutation UpdateWorkflowEvent($id: String!, $name: String, $description: String, $stepId: String) {
    event: updateWorkflowEvent(
      eventInput: { id: $id, name: $name, description: $description, stepId: $stepId }
    ) {
      ...workflowEventFields
    }
  }
  ${workflowEventFields}
`;
