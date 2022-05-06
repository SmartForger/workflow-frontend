import gql from 'graphql-tag';

export default gql`
  mutation DeleteWorkflowAction($id: String!) {
    action: deleteWorkflowAction(id: $id) {
      id
    }
  }
`;
