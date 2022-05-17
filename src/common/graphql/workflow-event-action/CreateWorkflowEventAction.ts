import gql from 'graphql-tag';
import workflowActionFields from '../fragments/workflowActionFields';

export default gql`
  mutation CreateWorkflowEventAction($actionId: String!, $eventId: String!, $order: Int) {
    eventAction: createWorkflowEventAction(
      input: { actionId: $actionId, eventId: $eventId, order: $order }
    ) {
      id
      info {
        ...workflowActionFields
      }
    }
  }
  ${workflowActionFields}
`;
