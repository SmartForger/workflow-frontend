import { WorkflowEventAction } from './WorkflowEventAction';
import { WorkflowEventCondition } from './WorkflowEventCondition';

export interface WorkflowEvent {
  id: string;
  name: string;
  description: string;
  actions: WorkflowEventAction[];
  conditions: WorkflowEventCondition[];
  stepId?: string;
}
