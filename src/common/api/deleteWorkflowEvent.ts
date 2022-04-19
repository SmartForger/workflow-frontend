import gql from 'graphql-tag';
import client from './client';

export const deleteWorkflowEvent = (id: string): Promise<string> =>
  client
    .mutate({
      mutation: gql`
        mutation DeleteWorkflowEvent($id: String!) {
          event: deleteWorkflowEvent(id: $id) {
            id
          }
        }
      `,
      variables: { id },
    })
    .then((response) => response.data.event.id);
