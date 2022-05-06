import gql from 'graphql-tag';

export default gql`
  mutation DeleteWorkflowEvent($id: String!) {
    event: deleteWorkflowEvent(id: $id) {
      id
    }
  }
`;
