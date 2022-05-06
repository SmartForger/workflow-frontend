import gql from 'graphql-tag';

export default gql`
  mutation DeleteWorkflowEventAction($id: String!) {
    eventAction: deleteWorkflowEventAction(id: $id) {
      id
    }
  }
`;
