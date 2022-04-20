import gql from 'graphql-tag';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';

export const deleteWorkflowStep = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The step is not saved in DB: ${id}`)
    : client
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
