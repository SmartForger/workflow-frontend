import gql from 'graphql-tag';
import client from './client';

export const deleteWorkflowLayout = (id: string): Promise<string> =>
  client
    .mutate({
      mutation: gql`
        mutation DeleteWorkflowLayout($id: String!) {
          layout: deleteWorkflowLayout(id: $id) {
            id
          }
        }
      `,
      variables: { id },
    })
    .then((response) => response.data.layout.id);
