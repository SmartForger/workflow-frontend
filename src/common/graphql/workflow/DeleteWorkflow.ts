import gql from 'graphql-tag';

export default gql`
  mutation DeleteWorkflow($id: String!) {
    workflow: deleteWorkflow(id: $id) {
      id
    }
  }
`;
