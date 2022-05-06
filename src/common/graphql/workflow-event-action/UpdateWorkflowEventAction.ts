import gql from 'graphql-tag';

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
`;
