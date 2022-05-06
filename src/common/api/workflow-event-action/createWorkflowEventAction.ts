import CreateWorkflowEventActionGQL from 'src/common/graphql/workflow-event-action/CreateWorkflowEventAction';
import { WorkflowEventAction } from 'src/common/types/WorkflowEventAction';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const createWorkflowEventAction = (
  eventAction: WorkflowEventAction
): Promise<WorkflowEventAction> =>
  isNewID(eventAction.eventId)
    ? rejectParentRequired('eventId is required')
    : client
        .mutate({
          mutation: CreateWorkflowEventActionGQL,
          variables: {
            actionId: eventAction.info.id,
            eventId: eventAction.eventId,
          },
        })
        .then((response) => response.data.eventAction);
