import { omit } from 'lodash';
import CreateWorkflowActionGQL from 'src/common/graphql/workflow-action/CreateWorkflowAction';
import { WorkflowAction } from '../../types/WorkflowAction';
import client from '../client';

export const createWorkflowAction = (action: WorkflowAction): Promise<WorkflowAction> =>
  client
    .mutate({
      mutation: CreateWorkflowActionGQL,
      variables: omit(action, ['id']),
    })
    .then((response) => response.data.action);
