import gql from 'graphql-tag';

export default gql`
  mutation UpdateWorkflowEventsOrder($orders: [OrderInput!]!) {
    orders: updateWorkflowEventsOrder(orders: $orders) {
      updated
    }
  }
`;
