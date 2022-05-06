import UpdateWorkflowEventActionGQL from 'src/common/graphql/workflow-event-action/UpdateWorkflowEventAction';
import { WorkflowEventAction } from 'src/common/types/WorkflowEventAction';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const updateWorkflowEventAction = (
  eventAction: WorkflowEventAction
): Promise<WorkflowEventAction> =>
  isNewID(eventAction.id)
    ? rejectParentRequired(`The event action is not saved in DB: ${eventAction.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowEventActionGQL,
          variables: {
            actionId: eventAction.info.id,
          },
        })
        .then((response) => response.data.eventAction);
