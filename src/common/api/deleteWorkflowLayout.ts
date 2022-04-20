import gql from 'graphql-tag';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

export const deleteWorkflowLayout = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The layout is not saved in DB: ${id}`)
    : client
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
