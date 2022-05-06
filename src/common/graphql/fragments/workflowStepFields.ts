import gql from 'graphql-tag';

export default gql`
  fragment workflowStepFields on WorkflowStep {
    id
    name
    displayName
    description 
    icon
    iconFileName
  }
`;
