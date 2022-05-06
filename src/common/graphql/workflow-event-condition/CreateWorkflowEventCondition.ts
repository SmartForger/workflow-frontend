import gql from 'graphql-tag';

export default gql`
  mutation CreateWorkflowEventCondition($name: String!, $filterJson: String!, $eventId: String!) {
    condition: createWorkflowEventCondition(
      input: { name: $name, filterJson: $filterJson, eventId: $eventId }
    ) {
      ...workflowEventConditionFields
    }
  }
`;
