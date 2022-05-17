import gql from 'graphql-tag';

export default gql`
  fragment workflowLayoutFields on WorkflowLayout {
    id
    name
    type
    icon
    iconFileName
    backgroundColor
    textColor
    visible
    order
  }
`;
