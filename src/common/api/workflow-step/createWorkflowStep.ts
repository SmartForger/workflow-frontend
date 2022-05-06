import { omit } from 'lodash';
import CreateWorkflowStepGQL from 'src/common/graphql/workflow-step/CreateWorkflowStep';
import { WorkflowStep } from '../../types/WorkflowStep';
import { isNewID, rejectParentRequired } from '../../utils/api-utils';
import client from '../client';
import { createWorkflowEvent } from '../workflow-event/createWorkflowEvent';
import { createWorkflowLayout } from '../workflow-layout/createWorkflowLayout';
import { createWorkflowWidget } from '../workflow-widget/createWorkflowWidget';

const createWorkflowStepObject = (step: WorkflowStep): Promise<WorkflowStep> =>
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

export const createWorkflowStep = async (step: WorkflowStep): Promise<WorkflowStep> => {
  const newStep = await createWorkflowStepObject(step);

  newStep.widgets = await Promise.all(
    (step.widgets || []).map((widget) => {
      widget.stepId = newStep.id;
      return createWorkflowWidget(widget);
    })
  );
  newStep.events = await Promise.all(
    (step.events || []).map((event) => {
      event.stepId = newStep.id;
      return createWorkflowEvent(event);
    })
  );
  newStep.layouts = await Promise.all(
    (step.layouts || []).map((layout) => {
      layout.stepId = newStep.id;
      return createWorkflowLayout(layout);
    })
  );

  return newStep;
};
