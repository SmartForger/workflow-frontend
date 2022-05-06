import gql from 'graphql-tag';
import workflowEventConditionFields from '../fragments/workflowEventConditionFields';

export default gql`
  mutation CreateWorkflowEventCondition($name: String!, $filterJson: String!, $eventId: String!) {
    condition: createWorkflowEventCondition(
      input: { name: $name, filterJson: $filterJson, eventId: $eventId }
    ) {
      ...workflowEventConditionFields
    }
  }
  ${workflowEventConditionFields}
`;
