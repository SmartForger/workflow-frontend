import DeleteWorkflowGQL from 'src/common/graphql/workflow/DeleteWorkflow';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const deleteWorkflow = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The workflow is not saved in DB: ${id}`)
    : client
        .mutate({
          mutation: DeleteWorkflowGQL,
          variables: { id },
        })
        .then((response) => response.data.workflow.id);
