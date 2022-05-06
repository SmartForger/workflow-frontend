import gql from 'graphql-tag';
import workflowWidgetFields from '../fragments/workflowWidgetFields';

export default gql`
  mutation CreateWorkflowWidget(
    $type: String!
    $displayName: String!
    $description: String!
    $icon: String!
    $iconFileName: String!
    $field: String!
    $updateEvent: String!
    $stepId: String
    $layoutId: String
  ) {
    widget: createWorkflowWidget(
      widgetInput: {
        type: $type
        displayName: $displayName
        description: $description
        icon: $icon
        iconFileName: $iconFileName
        field: $field
        updateEvent: $updateEvent
        stepId: $stepId
        layoutId: $layoutId
      }
    ) {
      ...workflowWidgetFields
    }
  }
  ${workflowWidgetFields}
`;
