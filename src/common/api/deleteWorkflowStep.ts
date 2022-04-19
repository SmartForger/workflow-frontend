import gql from 'graphql-tag';
import client from './client';

export const deleteWorkflowStep = (id: string): Promise<string> =>
  client
    .mutate({
      mutation: gql`
        mutation DeleteWorkflowStep($id: String!) {
          step: deleteWorkflowStep(id: $id) {
            id
          }
        }
      `,
      variables: { id },
    })
    .then((response) => response.data.step.id);
