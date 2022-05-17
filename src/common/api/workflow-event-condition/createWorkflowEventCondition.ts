import { omit } from 'lodash';
import CreateWorkflowEventConditionGQL from 'src/common/graphql/workflow-event-condition/CreateWorkflowEventCondition';
import { WorkflowEventCondition } from 'src/common/types/WorkflowEventCondition';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const createWorkflowEventCondition = (
  eventCondition: WorkflowEventCondition
): Promise<WorkflowEventCondition> =>
  isNewID(eventCondition.eventId)
    ? rejectParentRequired('eventId is required')
    : client
        .mutate({
          mutation: CreateWorkflowEventConditionGQL,
          variables: omit(eventCondition, ['id']),
        })
        .then((response) => response.data.condition);
