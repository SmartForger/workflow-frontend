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
import { deleteWorkflowEvent } from './workflow-event/deleteWorkflowEvent';
import { createWorkflowEventAction } from './workflow-event-action/createWorkflowEventAction';
import { updateWorkflowEventAction } from './workflow-event-action/updateWorkflowEventAction';
import { deleteWorkflowEventAction } from './workflow-event-action/deleteWorkflowEventAction';
import { createWorkflowEventCondition } from './workflow-event-condition/createWorkflowEventAction';
import { updateWorkflowEventCondition } from './workflow-event-condition/updateWorkflowEventAction';
import { deleteWorkflowEventCondition } from './workflow-event-condition/deleteWorkflowEventAction';
import { createWorkflowLayout } from './workflow-layout/createWorkflowLayout';
import { updateWorkflowLayout } from './workflow-layout/updateWorkflowLayout';
import { deleteWorkflowLayout } from './workflow-layout/deleteWorkflowLayout';
import { createWorkflowStep } from './workflow-step/createWorkflowStep';
import { updateWorkflowStep } from './workflow-step/updateWorkflowStep';
import { deleteWorkflowStep } from './workflow-step/deleteWorkflowStep';
import { createWorkflowWidget } from './workflow-widget/createWorkflowWidget';
import { updateWorkflowWidget } from './workflow-widget/updateWorkflowWidget';
import { deleteWorkflowWidget } from './workflow-widget/deleteWorkflowWidget';
import { createSignedURL } from './createSignedURL';

export default {
  getWorkflows,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
  createWorkflowStep,
  updateWorkflowStep,
  deleteWorkflowStep,
  createWorkflowEvent,
  updateWorkflowEvent,
  deleteWorkflowEvent,
  createWorkflowEventAction,
  updateWorkflowEventAction,
  deleteWorkflowEventAction,
  createWorkflowEventCondition,
  updateWorkflowEventCondition,
  deleteWorkflowEventCondition,
  createWorkflowWidget,
  updateWorkflowWidget,
  deleteWorkflowWidget,
  createWorkflowLayout,
  updateWorkflowLayout,
  deleteWorkflowLayout,
  createSignedURL,
  getWorkflowActions,
  createWorkflowAction,
  updateWorkflowAction,
  deleteWorkflowAction,
};
