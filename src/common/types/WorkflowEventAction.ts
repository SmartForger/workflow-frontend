import { WorkflowAction } from './WorkflowAction';

export interface WorkflowEventAction {
  id: string;
  info: WorkflowAction;
  eventId?: string;
}
