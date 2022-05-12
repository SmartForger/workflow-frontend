import { WorkflowEvent } from './WorkflowEvent';
import { WorkflowLayout } from './WorkflowLayout';
import { WorkflowWidget } from './WorkflowWidget';

export interface WorkflowStep {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  iconFileName: string | null;
  workflowId?: string;
  widgets: WorkflowWidget[];
  events: WorkflowEvent[];
  layouts: WorkflowLayout[];
}
