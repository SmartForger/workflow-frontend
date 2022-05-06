import gql from 'graphql-tag';
import workflowFields from '../fragments/workflowFields';

export default gql`
  mutation CreateWorkflow(
    $category: String!
    $subCategory: String!
    $name: String!
    $displayName: String!
    $description: String!
    $icon: String!
    $iconFileName: String!
    $mode: [String!]!
  ) {
    workflow: createWorkflow(
      workflowInput: {
        category: $category
        subCategory: $subCategory
        name: $name
        displayName: $displayName
        description: $description
        icon: $icon
        iconFileName: $iconFileName
        mode: $mode
      }
    ) {
      ...workflowFields
    }
  }
  ${workflowFields}
`;
