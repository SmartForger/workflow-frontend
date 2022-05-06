import gql from 'graphql-tag';

export default gql`
  mutation DeleteWorkflowStep($id: String!) {
    step: deleteWorkflowStep(id: $id) {
      id
    }
  }
`;
