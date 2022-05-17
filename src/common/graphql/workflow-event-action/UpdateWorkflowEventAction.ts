import gql from 'graphql-tag';
import workflowActionFields from '../fragments/workflowActionFields';

export default gql`
  mutation UpdateWorkflowEventAction(
    $id: String!
    $actionId: String
    $eventId: String
    $order: Int
  ) {
    eventAction: updateWorkflowEventAction(
      input: { id: $id, actionId: $actionId, eventId: $eventId, order: $order }
    ) {
      id
      info {
        ...workflowActionFields
      }
    }
  }
  ${workflowActionFields}
`;
