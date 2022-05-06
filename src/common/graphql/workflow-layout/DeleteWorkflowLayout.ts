import gql from 'graphql-tag';

export default gql`
  mutation DeleteWorkflowLayout($id: String!) {
    layout: deleteWorkflowLayout(id: $id) {
      id
    }
  }
`;
