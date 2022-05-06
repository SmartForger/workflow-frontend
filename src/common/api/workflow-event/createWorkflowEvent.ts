import { omit } from 'lodash';
import CreateWorkflowEventGQL from 'src/common/graphql/workflow-event/CreateWorkflowEvent';
import { WorkflowEvent } from '../../types/WorkflowEvent';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const createWorkflowEvent = (event: WorkflowEvent): Promise<WorkflowEvent> =>
  isNewID(event.stepId)
    ? rejectParentRequired('stepId is required')
    : client
        .mutate({
          mutation: CreateWorkflowEventGQL,
          variables: omit(event, ['id']),
        })
        .then((response) => response.data.event);
