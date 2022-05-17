import gql from 'graphql-tag';

export default gql`
  mutation UpdateWorkflowLayoutsOrder($orders: [OrderInput!]!) {
    orders: updateWorkflowLayoutsOrder(orders: $orders) {
      updated
    }
  }
`;
