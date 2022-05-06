import gql from 'graphql-tag';

export default gql`
  fragment workflowLayoutFields on WorkflowLayout {
    id
    title
    icon
    iconFileName
    backgroundColor
    textColor
    visible
  }
`;
