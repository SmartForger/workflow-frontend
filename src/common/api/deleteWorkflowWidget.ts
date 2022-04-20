import gql from 'graphql-tag';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

export const deleteWorkflowWidget = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The widget is not saved in DB: ${id}`)
    : client
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
