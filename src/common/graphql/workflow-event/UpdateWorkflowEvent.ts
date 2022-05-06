import gql from 'graphql-tag';

export default gql`
  mutation UpdateWorkflowEvent($id: String!, $name: String, $description: String, $stepId: String) {
    event: updateWorkflowEvent(
      eventInput: { id: $id, name: $name, description: $description, stepId: $stepId }
    ) {
      ...workflowEventFields
    }
  }
`;
