import gql from 'graphql-tag';
import workflowEventConditionFields from '../fragments/workflowEventConditionFields';

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
  ${workflowEventConditionFields}
`;
