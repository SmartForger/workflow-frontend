import gql from 'graphql-tag';
import workflowActionFields from '../fragments/workflowActionFields';

export default gql`
  mutation CreateWorkflowEventAction($actionId: String!, $eventId: String!) {
    eventAction: createWorkflowEventAction(input: { actionId: $actionId, eventId: $eventId }) {
      id
      info {
        ...workflowActionFields
      }
    }
  }
  ${workflowActionFields}
`;
