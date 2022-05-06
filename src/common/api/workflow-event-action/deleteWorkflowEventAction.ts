import DeleteWorkflowEventActionGQL from 'src/common/graphql/workflow-event-action/DeleteWorkflowEventAction';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const deleteWorkflowEventAction = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The event action is not saved in DB: ${id}`)
    : client
        .mutate({
          mutation: DeleteWorkflowEventActionGQL,
          variables: { id },
        })
        .then((response) => response.data.eventAction.id);
