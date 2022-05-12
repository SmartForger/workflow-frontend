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
    $stepId: String
    $layoutId: String
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
        stepId: $stepId
        layoutId: $layoutId
      }
    ) {
      ...workflowWidgetFields
    }
  }
  ${workflowWidgetFields}
`;
