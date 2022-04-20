import gql from 'graphql-tag';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

export const deleteWorkflowEvent = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The event is not saved in DB: ${id}`)
    : client
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
