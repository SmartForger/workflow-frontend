import gql from 'graphql-tag';
import { omit } from 'lodash';
import { WorkflowStep } from '../types/WorkflowStep';
import { isNewID, rejectParentRequired } from '../utils/api-utils';
import client from './client';
import { createWorkflowEvent } from './createWorkflowEvent';
import { createWorkflowLayout } from './createWorkflowLayout';
import { createWorkflowWidget } from './createWorkflowWidget';

const CreateWorkflowStepGQL = gql`
  mutation CreateWorkflowStep(
    $name: String!
    $displayName: String!
    $description: String!
    $icon: String!
    $iconFileName: String!
    $workflowId: String!
  ) {
    step: createWorkflowStep(
      stepInput: {
        name: $name
        displayName: $displayName
        description: $description
        icon: $icon
        iconFileName: $iconFileName
        workflowId: $workflowId
      }
    ) {
      ...stepFields
    }
  }

  fragment stepFields on WorkflowStep {
    id
    name
    displayName
    description
    icon
    iconFileName
  }
`;

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

export const createWorkflowStep = async (
  step: WorkflowStep
): Promise<WorkflowStep> => {
  const newStep = await createWorkflowStepObject(step);

  console.log(111, step.widgets);

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
