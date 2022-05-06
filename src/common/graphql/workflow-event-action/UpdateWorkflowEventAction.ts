import gql from 'graphql-tag';
import workflowActionFields from '../fragments/workflowActionFields';

export default gql`
  mutation UpdateWorkflowEventAction($id: String!, $actionId: String, $eventId: String) {
    eventAction: updateWorkflowEventAction(
      input: { id: $id, actionId: $actionId, eventId: $eventId }
    ) {
      id
      info {
        ...workflowActionFields
      }
    }
  }
  ${workflowActionFields}
`;
