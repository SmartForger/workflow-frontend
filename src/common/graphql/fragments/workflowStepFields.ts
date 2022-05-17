import gql from 'graphql-tag';

export default gql`
  fragment workflowStepFields on WorkflowStep {
    id
    name
    description
    icon
    iconFileName
    order
  }
`;
