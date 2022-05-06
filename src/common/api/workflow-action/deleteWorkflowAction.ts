import DeleteWorkflowActionGQL from 'src/common/graphql/workflow-action/DeleteWorkflowAction';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const deleteWorkflowAction = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The action is not saved in DB: ${id}`)
    : client
        .mutate({
          mutation: DeleteWorkflowActionGQL,
          variables: { id },
        })
        .then((response) => response.data.action.id);
