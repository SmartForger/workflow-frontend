import gql from 'graphql-tag';

export default gql`
  fragment workflowEventFields on WorkflowEvent {
    id
    name
    description
  }
`;