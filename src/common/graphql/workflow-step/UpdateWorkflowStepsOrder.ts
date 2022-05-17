import gql from 'graphql-tag';

export default gql`
  mutation UpdateWorkflowStepsOrder($orders: [OrderInput!]!) {
    orders: updateWorkflowStepsOrder(orders: $orders) {
      updated
    }
  }
`;
