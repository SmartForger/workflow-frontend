import { omit } from 'lodash';
import CreateWorkflowStepGQL from 'src/common/graphql/workflow-step/CreateWorkflowStep';
import { WorkflowStep } from '../../types/WorkflowStep';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';
import { createWorkflowEvent } from '../workflow-event/createWorkflowEvent';
import { createWorkflowLayout } from '../workflow-layout/createWorkflowLayout';
import { createWorkflowWidget } from '../workflow-widget/createWorkflowWidget';

export const createWorkflowStepObject = (step: WorkflowStep): Promise<WorkflowStep> =>
  isNewID(step.workflowId)
    ? rejectParentRequired('workflowId is required')
    : client
        .mutate({
          mutation: CreateWorkflowStepGQL,
          variables: omit(step, ['id', 'widgets', 'events', 'layouts']),
        })
        .then((response) => ({
          ...response.data.step,
          widgets: [],
          events: [],
          layouts: [],
        }));

export const createWorkflowStepChildren = async (newStep: WorkflowStep): Promise<WorkflowStep> => {
  newStep.widgets = await Promise.all(
    (newStep.widgets || []).map((widget) => {
      widget.stepId = newStep.id;
      return createWorkflowWidget(widget);
    })
  );
  newStep.events = await Promise.all(
    (newStep.events || []).map((event) => {
      event.stepId = newStep.id;
      return createWorkflowEvent(event);
    })
  );
  newStep.layouts = await Promise.all(
    (newStep.layouts || []).map((layout) => {
      layout.stepId = newStep.id;
      return createWorkflowLayout(layout);
    })
  );

  return newStep;
};

export const createWorkflowStep = async (step: WorkflowStep) => {
  const newStep = await createWorkflowStepObject(step);
  step.id = newStep.id;
  return await createWorkflowStepChildren(step);
};
