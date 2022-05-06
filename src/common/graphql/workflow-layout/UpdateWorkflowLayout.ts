import gql from 'graphql-tag';
import workflowLayoutFields from '../fragments/workflowLayoutFields';

export default gql`
  mutation UpdateWorkflowLayout(
    $id: String!
    $title: String
    $icon: String
    $iconFileName: String
    $backgroundColor: String
    $textColor: String
    $visible: Boolean
    $stepId: String
  ) {
    layout: updateWorkflowLayout(
      layoutInput: {
        id: $id
        title: $title
        icon: $icon
        iconFileName: $iconFileName
        backgroundColor: $backgroundColor
        textColor: $textColor
        visible: $visible
        stepId: $stepId
      }
    ) {
      ...workflowLayoutFields
    }
  }
  ${workflowLayoutFields}
`;
