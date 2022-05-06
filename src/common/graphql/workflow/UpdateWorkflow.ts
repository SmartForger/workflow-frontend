import gql from 'graphql-tag';
import workflowFields from '../fragments/workflowFields';

export default gql`
  mutation UpdateWorkflow(
    $id: String!
    $category: String
    $subCategory: String
    $name: String
    $displayName: String
    $description: String
    $icon: String
    $iconFileName: String
  ) {
    workflow: updateWorkflow(
      workflowInput: {
        id: $id
        category: $category
        subCategory: $subCategory
        name: $name
        displayName: $displayName
        description: $description
        icon: $icon
        iconFileName: $iconFileName
      }
    ) {
      ...workflowFields
    }
  }
  ${workflowFields}
`;
