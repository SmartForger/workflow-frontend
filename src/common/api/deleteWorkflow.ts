import gql from 'graphql-tag';
import client from './client';

export const deleteWorkflow = (id: string): Promise<string> =>
  client
    .mutate({
      mutation: gql`
        mutation DeleteWorkflow($id: String!) {
          workflow: deleteWorkflow(id: $id) {
            id
          }
        }
      `,
      variables: { id },
    })
    .then((response) => response.data.workflow.id);
