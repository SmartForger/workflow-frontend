import gql from 'graphql-tag';

export default gql`
  mutation UpdateWorkflowWidgetsOrder($orders: [OrderInput!]!) {
    orders: updateWorkflowWidgetsOrder(orders: $orders) {
      updated
    }
  }
`;
