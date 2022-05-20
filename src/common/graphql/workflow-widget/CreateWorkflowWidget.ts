import gql from 'graphql-tag';
import workflowWidgetFields from '../fragments/workflowWidgetFields';

export default gql`
  mutation CreateWorkflowWidget(
    $type: String!
    $name: String!
    $description: String
    $icon: String
    $iconFileName: String
    $field: String
    $event: String
    $extra: String
    $rules: String
    $stepId: String
    $layoutId: String
    $order: Int
  ) {
    widget: createWorkflowWidget(
      widgetInput: {
        type: $type
        name: $name
        description: $description
        icon: $icon
        iconFileName: $iconFileName
        field: $field
        event: $event
        extra: $extra
        rules: $rules
        stepId: $stepId
        layoutId: $layoutId
        order: $order
      }
    ) {
      ...workflowWidgetFields
    }
  }
  ${workflowWidgetFields}
`;
