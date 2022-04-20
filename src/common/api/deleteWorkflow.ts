import gql from 'graphql-tag';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

export const deleteWorkflow = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The workflow is not saved in DB: ${id}`)
    : client
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
