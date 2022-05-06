import gql from 'graphql-tag';

export default gql`
  mutation CreateWorkflowEventAction($actionId: String!, $eventId: String!) {
    eventAction: createWorkflowEventAction(input: { actionId: $actionId, eventId: $eventId }) {
      id
      info {
        ...workflowActionFields
      }
    }
  }
`;
