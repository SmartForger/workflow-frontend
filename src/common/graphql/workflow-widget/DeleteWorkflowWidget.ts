import gql from 'graphql-tag';

export default gql`
  mutation DeleteWorkflowWidget($id: String!) {
    widget: deleteWorkflowWidget(id: $id) {
      id
    }
  }
`;
