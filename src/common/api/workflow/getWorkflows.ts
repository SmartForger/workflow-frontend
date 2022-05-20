import GetWorkflowsGQL from 'src/common/graphql/workflow/GetWorkflows';
import { transformWidget } from 'src/common/utils/transforms';
import { Workflow } from '../../types/Workflow';
import client from '../client';

export const getWorkflows = (): Promise<Workflow[]> =>
  client
    .query({
      query: GetWorkflowsGQL,
    })
    .then((response) => response.data.workflows)
    .then((workflows: Workflow[]) => {
      workflows.forEach((workflow) => {
        workflow.steps.forEach((step) => {
          step.widgets.forEach((widget) => {
            transformWidget(widget);
          });
          step.layouts.forEach((layout) => {
            layout.widgets.forEach((widget) => {
              transformWidget(widget);
            });
          });
        });
      });
      return workflows;
    });
