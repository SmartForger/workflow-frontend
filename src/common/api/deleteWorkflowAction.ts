import gql from 'graphql-tag';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

export const deleteWorkflowAction = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The action is not saved in DB: ${id}`)
    : client
        .mutate({
          mutation: gql`
            mutation DeleteWorkflowAction($id: String!) {
              action: deleteWorkflowAction(id: $id) {
                id
              }
            }
          `,
          variables: { id },
        })
        .then((response) => response.data.action.id);
