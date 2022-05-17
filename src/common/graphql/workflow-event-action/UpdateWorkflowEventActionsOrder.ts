import gql from 'graphql-tag';

export default gql`
  mutation UpdateWorkflowEventActionsOrder($orders: [OrderInput!]!) {
    orders: updateWorkflowEventActionsOrder(orders: $orders) {
      updated
    }
  }
`;
