import GetWorkflowsGQL from 'src/common/graphql/workflow/GetWorkflows';
import { Workflow } from '../../types/Workflow';
import client from '../client';

export const getWorkflows = (): Promise<Workflow[]> =>
  client
    .query({
      query: GetWorkflowsGQL,
    })
    .then((response) => response.data.workflows);
