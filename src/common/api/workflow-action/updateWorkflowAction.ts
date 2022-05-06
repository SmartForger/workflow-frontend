import UpdateWorkflowActionGQL from 'src/common/graphql/workflow-action/UpdateWorkflowAction';
import { WorkflowAction } from '../../types/WorkflowAction';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';

export const updateWorkflowAction = (action: WorkflowAction): Promise<WorkflowAction> =>
  isNewID(action.id)
    ? rejectParentRequired(`The workflow is not saved in DB: ${action.id}`)
    : client
        .mutate({
          mutation: UpdateWorkflowActionGQL,
          variables: action,
        })
        .then((response) => response.data.action);
