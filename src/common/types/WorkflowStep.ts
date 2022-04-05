import { WorkflowEvent } from './WorkflowEvent';
import { WorkflowLayout } from './WorkflowLayout';
import { WorkflowWidget } from './WorkflowWidget';

export interface WorkflowStep {
  id: number;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  iconFileName: string;
  widgets: WorkflowWidget[];
  events: WorkflowEvent[];
  layouts: WorkflowLayout[];
}
