import CreateWorkflowEventGQL from 'src/common/graphql/workflow-event/CreateWorkflowEvent';
import { WorkflowEvent } from '../../types/WorkflowEvent';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';
import { createWorkflowEventAction } from '../workflow-event-action/createWorkflowEventAction';
import { createWorkflowEventCondition } from '../workflow-event-condition/createWorkflowEventCondition';

export const createWorkflowEventObject = (event: WorkflowEvent): Promise<WorkflowEvent> =>
  isNewID(event.stepId)
    ? rejectParentRequired('stepId is required')
    : client
        .mutate({
          mutation: CreateWorkflowEventGQL,
          variables: {
            name: event.name,
            description: event.description,
            targetId: event.target?.id,
            stepId: event.stepId,
          },
        })
        .then((response) => ({ ...response.data.event, actions: [], conditions: [] }));

export const createWorkflowEvent = async (event: WorkflowEvent): Promise<WorkflowEvent> => {
  const newEvent = await createWorkflowEventObject(event);
  newEvent.actions = await Promise.all(
    (event.actions || []).map((action) => {
      action.eventId = newEvent.id;
      return createWorkflowEventAction(action);
    })
  );
  newEvent.conditions = await Promise.all(
    (event.conditions || []).map((condition) => {
      condition.eventId = newEvent.id;
      return createWorkflowEventCondition(condition);
    })
  );

  return newEvent;
};
