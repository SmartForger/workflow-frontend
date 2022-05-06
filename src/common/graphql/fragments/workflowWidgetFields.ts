import gql from 'graphql-tag';

export default gql`
  fragment workflowWidgetFields on WorkflowWidget {
    id
    type
    displayName
    description
    icon
    iconFileName
    field
    updateEvent
  }
`;
