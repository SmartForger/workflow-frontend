import gql from 'graphql-tag';

export default gql`
  query GetWorkflowActions {
    actions: workflowActions {
      ...actionFields
    }
  }
`;
