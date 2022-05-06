import gql from 'graphql-tag';

export default gql`
  mutation DeleteWorkflowEventCondition($id: String!) {
    condition: deleteWorkflowEventCondition(id: $id) {
      id
    }
  }
`;
