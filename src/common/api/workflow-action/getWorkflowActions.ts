import GetWorkflowActionsGQL from 'src/common/graphql/workflow-action/GetWorkflowActions';
import { WorkflowAction } from '../../types/WorkflowAction';
import client from '../client';

export const getWorkflowActions = (): Promise<WorkflowAction[]> =>
  client
    .query({
      query: GetWorkflowActionsGQL,
    })
    .then((response) => response.data.actions);
