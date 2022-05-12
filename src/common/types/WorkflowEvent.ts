import { WorkflowEventAction } from './WorkflowEventAction';
import { WorkflowEventCondition } from './WorkflowEventCondition';
import { WorkflowStep } from './WorkflowStep';

export interface WorkflowEvent {
  id: string;
  name: string;
  description: string | null;
  target: Pick<WorkflowStep, 'id' | 'name'> | null;
  actions: WorkflowEventAction[];
  conditions: WorkflowEventCondition[];
  stepId?: string;
}
