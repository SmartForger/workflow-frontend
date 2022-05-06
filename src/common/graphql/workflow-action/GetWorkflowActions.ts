import gql from 'graphql-tag';
import workflowActionFields from '../fragments/workflowActionFields';

export default gql`
  query GetWorkflowActions {
    actions: workflowActions {
      ...workflowActionFields
    }
  }
  ${workflowActionFields}
`;
