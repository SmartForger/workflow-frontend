import gql from 'graphql-tag';
import workflowActionFields from '../fragments/workflowActionFields';
import workflowEventConditionFields from '../fragments/workflowEventConditionFields';
import workflowEventFields from '../fragments/workflowEventFields';
import workflowFields from '../fragments/workflowFields';
import workflowLayoutFields from '../fragments/workflowLayoutFields';
import workflowStepFields from '../fragments/workflowStepFields';
import workflowWidgetFields from '../fragments/workflowWidgetFields';

export default gql`
  query GetWorkflows {
    workflows {
      ...workflowFields
      steps {
        ...workflowStepFields
        events {
          ...workflowEventFields
          actions {
            id
            info {
              ...workflowActionFields
            }
          }
          conditions {
            ...workflowEventConditionFields
          }
        }
        widgets {
          ...workflowWidgetFields
        }
        layouts {
          ...workflowLayoutFields
          widgets {
            ...workflowWidgetFields
          }
        }
      }
    }
  }
  ${workflowFields}
  ${workflowStepFields}
  ${workflowEventFields}
  ${workflowEventConditionFields}
  ${workflowActionFields}
  ${workflowWidgetFields}
  ${workflowLayoutFields}
`;
