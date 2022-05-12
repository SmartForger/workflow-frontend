import gql from 'graphql-tag';

export default gql`
  fragment workflowWidgetFields on WorkflowWidget {
    id
    type
    name
    description
    icon
    iconFileName
    field
    event
  }
`;
