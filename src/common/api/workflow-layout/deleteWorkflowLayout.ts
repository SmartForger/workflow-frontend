import DeleteWorkflowLayoutGQL from 'src/common/graphql/workflow-layout/DeleteWorkflowLayout';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const deleteWorkflowLayout = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The layout is not saved in DB: ${id}`)
    : client
        .mutate({
          mutation: DeleteWorkflowLayoutGQL,
          variables: { id },
        })
        .then((response) => response.data.layout.id);
