import gql from 'graphql-tag';

export default gql`
  mutation CreateWorkflowLayout(
    $title: String!
    $icon: String!
    $iconFileName: String!
    $backgroundColor: String!
    $textColor: String!
    $visible: Boolean!
    $stepId: String!
  ) {
    layout: createWorkflowLayout(
      layoutInput: {
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
`;
