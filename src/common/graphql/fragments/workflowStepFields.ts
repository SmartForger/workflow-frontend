import gql from 'graphql-tag';

export default gql`
  fragment workflowFields on Workflow {
    id
    name
    category
    subCategory
    name
    displayName
    description
    icon
    iconFileName
  }
`;
