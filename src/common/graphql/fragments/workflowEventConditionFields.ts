import gql from 'graphql-tag';

export default gql`
  fragment workflowEventConditionFields on WorkflowEventCondition {
    id
    name
    filterJson
  }
`;
