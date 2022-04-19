import gql from 'graphql-tag';
import client from './client';

export const deleteWorkflowWidget = (id: string): Promise<string> =>
  client
    .mutate({
      mutation: gql`
        mutation DeleteWorkflowWidget($id: String!) {
          widget: deleteWorkflowWidget(id: $id) {
            id
          }
        }
      `,
      variables: { id },
    })
    .then((response) => response.data.widget.id);
