import DeleteWorkflowEventGQL from 'src/common/graphql/workflow-event/DeleteWorkflowEvent';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const deleteWorkflowEvent = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The event is not saved in DB: ${id}`)
    : client
        .mutate({
          mutation: DeleteWorkflowEventGQL,
          variables: { id },
        })
        .then((response) => response.data.event.id);
