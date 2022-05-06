import gql from 'graphql-tag';
import workflowEventFields from '../fragments/workflowEventFields';

export default gql`
  mutation CreateWorkflowEvent($name: String!, $description: String!, $stepId: String!) {
    event: createWorkflowEvent(
      eventInput: { name: $name, description: $description, stepId: $stepId }
    ) {
      ...workflowEventFields
    }
  }
  ${workflowEventFields}
`;
