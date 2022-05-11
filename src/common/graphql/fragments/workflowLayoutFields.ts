import gql from 'graphql-tag';

export default gql`
  fragment workflowLayoutFields on WorkflowLayout {
    id
    title
    type
    icon
    iconFileName
    backgroundColor
    textColor
    visible
  }
`;
