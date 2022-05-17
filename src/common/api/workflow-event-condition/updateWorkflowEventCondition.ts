import UpdateWorkflowEventConditionGQL from 'src/common/graphql/workflow-event-condition/UpdateWorkflowEventCondition';
import { WorkflowEventCondition } from 'src/common/types/WorkflowEventCondition';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const updateWorkflowEventCondition = (
  eventCondition: WorkflowEventCondition
): Promise<WorkflowEventCondition> =>
  isNewID(eventCondition.id)
    ? rejectParentRequired(`The event action is not saved in DB: ${eventCondition.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowEventConditionGQL,
          variables: eventCondition,
        })
        .then((response) => response.data.condition);
