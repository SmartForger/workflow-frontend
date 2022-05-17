import gql from 'graphql-tag';

export default gql`
  mutation UpdateWorkflowEventConditionsOrder($orders: [OrderInput!]!) {
    orders: updateWorkflowEventConditionsOrder(orders: $orders) {
      updated
    }
  }
`;
