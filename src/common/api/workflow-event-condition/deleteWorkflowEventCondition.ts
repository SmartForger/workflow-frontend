import DeleteWorkflowEventConditionGQL from 'src/common/graphql/workflow-event-condition/DeleteWorkflowEventCondition';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const deleteWorkflowEventCondition = (id: string): Promise<string> =>
  isNewID(id)
    ? rejectParentRequired(`The event condition is not saved in DB: ${id}`)
    : client
        .mutate({
          mutation: DeleteWorkflowEventConditionGQL,
          variables: { id },
        })
        .then((response) => response.data.condition.id);
