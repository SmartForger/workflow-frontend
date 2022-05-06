import gql from 'graphql-tag';

export default gql`
  mutation UpdateWorkflowEventCondition(
    $id: String!
    $name: String
    $filterJson: String
    $eventId: String
  ) {
    condition: updateWorkflowEventCondition(
      input: { id: $id, name: $name, filterJson: $filterJson, eventId: $eventId }
    ) {
      ...workflowEventConditionFields
    }
  }
`;
