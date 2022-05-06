import { omit } from 'lodash';
import UpdateWorkflowEventGQL from 'src/common/graphql/workflow-event/UpdateWorkflowEvent';
import { WorkflowEvent } from '../../types/WorkflowEvent';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const updateWorkflowEvent = (event: WorkflowEvent): Promise<WorkflowEvent> =>
  isNewID(event.id)
    ? rejectParentRequired(`The event is not saved in DB: ${event.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowEventGQL,
          variables: omit(event, ['actions', 'conditions']),
        })
        .then((response) => response.data.event);
