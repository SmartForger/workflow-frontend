import gql from 'graphql-tag';
import workflowWidgetFields from '../fragments/workflowWidgetFields';

export default gql`
  mutation UpdateWorkflowWidget(
    $id: String!
    $type: String
    $name: String
    $description: String
    $icon: String
    $iconFileName: String
    $field: String
    $updateEvent: String
    $stepId: String
    $layoutId: String
  ) {
    widget: updateWorkflowWidget(
      widgetInput: {
        id: $id
        type: $type
        name: $name
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
