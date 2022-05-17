import { getWorkflows } from './workflow/getWorkflows';
import { createWorkflow } from './workflow/createWorkflow';
import { updateWorkflow } from './workflow/updateWorkflow';
import { deleteWorkflow } from './workflow/deleteWorkflow';
import { getWorkflowActions } from './workflow-action/getWorkflowActions';
import { createWorkflowAction } from './workflow-action/createWorkflowAction';
import { updateWorkflowAction } from './workflow-action/updateWorkflowAction';
import { deleteWorkflowAction } from './workflow-action/deleteWorkflowAction';
import { createWorkflowEvent } from './workflow-event/createWorkflowEvent';
import { updateWorkflowEvent } from './workflow-event/updateWorkflowEvent';
import { updateWorkflowEventsOrder } from './workflow-event/updateWorkflowEventsOrder';
import { deleteWorkflowEvent } from './workflow-event/deleteWorkflowEvent';
import { createWorkflowEventAction } from './workflow-event-action/createWorkflowEventAction';
import { updateWorkflowEventAction } from './workflow-event-action/updateWorkflowEventAction';
import { updateWorkflowEventActionsOrder } from './workflow-event-action/updateWorkflowEventActionsOrder';
import { deleteWorkflowEventAction } from './workflow-event-action/deleteWorkflowEventAction';
import { createWorkflowEventCondition } from './workflow-event-condition/createWorkflowEventCondition';
import { updateWorkflowEventCondition } from './workflow-event-condition/updateWorkflowEventCondition';
import { updateWorkflowEventConditionsOrder } from './workflow-event-condition/updateWorkflowEventConditionsOrder';
import { deleteWorkflowEventCondition } from './workflow-event-condition/deleteWorkflowEventCondition';
import { createWorkflowLayout } from './workflow-layout/createWorkflowLayout';
import { updateWorkflowLayout } from './workflow-layout/updateWorkflowLayout';
import { updateWorkflowLayoutsOrder } from './workflow-layout/updateWorkflowLayoutsOrder';
import { deleteWorkflowLayout } from './workflow-layout/deleteWorkflowLayout';
import { createWorkflowStep } from './workflow-step/createWorkflowStep';
import { updateWorkflowStep } from './workflow-step/updateWorkflowStep';
import { updateWorkflowStepsOrder } from './workflow-step/updateWorkflowStepsOrder';
import { deleteWorkflowStep } from './workflow-step/deleteWorkflowStep';
import { createWorkflowWidget } from './workflow-widget/createWorkflowWidget';
import { updateWorkflowWidget } from './workflow-widget/updateWorkflowWidget';
import { updateWorkflowWidgetsOrder } from './workflow-widget/updateWorkflowWidgetsOrder';
import { deleteWorkflowWidget } from './workflow-widget/deleteWorkflowWidget';
import { createSignedURL } from './createSignedURL';

export default {
  getWorkflows,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
  createWorkflowStep,
  updateWorkflowStep,
  updateWorkflowStepsOrder,
  deleteWorkflowStep,
  createWorkflowEvent,
  updateWorkflowEvent,
  updateWorkflowEventsOrder,
  deleteWorkflowEvent,
  createWorkflowEventAction,
  updateWorkflowEventAction,
  updateWorkflowEventActionsOrder,
  deleteWorkflowEventAction,
  createWorkflowEventCondition,
  updateWorkflowEventCondition,
  updateWorkflowEventConditionsOrder,
  deleteWorkflowEventCondition,
  createWorkflowWidget,
  updateWorkflowWidget,
  updateWorkflowWidgetsOrder,
  deleteWorkflowWidget,
  createWorkflowLayout,
  updateWorkflowLayout,
  updateWorkflowLayoutsOrder,
  deleteWorkflowLayout,
  createSignedURL,
  getWorkflowActions,
  createWorkflowAction,
  updateWorkflowAction,
  deleteWorkflowAction,
};
