import gql from 'graphql-tag';
import workflowEventConditionFields from '../fragments/workflowEventConditionFields';

export default gql`
  mutation CreateWorkflowEventCondition(
    $name: String!
    $filterJson: String!
    $eventId: String!
    $order: Int
  ) {
    condition: createWorkflowEventCondition(
      input: { name: $name, filterJson: $filterJson, eventId: $eventId, order: $order }
    ) {
      ...workflowEventConditionFields
    }
  }
  ${workflowEventConditionFields}
`;
