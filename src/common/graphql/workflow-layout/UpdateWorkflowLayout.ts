import gql from 'graphql-tag';
import workflowLayoutFields from '../fragments/workflowLayoutFields';

export default gql`
  mutation UpdateWorkflowLayout(
    $id: String!
    $name: String
    $type: String
    $icon: String
    $iconFileName: String
    $backgroundColor: String
    $textColor: String
    $visible: Boolean
    $stepId: String
    $order: Int
  ) {
    layout: updateWorkflowLayout(
      layoutInput: {
        id: $id
        name: $name
        type: $type
        icon: $icon
        iconFileName: $iconFileName
        backgroundColor: $backgroundColor
        textColor: $textColor
        visible: $visible
        stepId: $stepId
        order: $order
      }
    ) {
      ...workflowLayoutFields
    }
  }
  ${workflowLayoutFields}
`;
