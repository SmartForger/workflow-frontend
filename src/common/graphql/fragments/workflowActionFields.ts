import gql from 'graphql-tag';

export default gql`
  fragment workflowActionFields on WorkflowAction {
    id
    type
    name
    code
    content
    components
  }
`;
