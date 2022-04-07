import { WorkflowEvent } from './WorkflowEvent';
import { WorkflowLayout } from './WorkflowLayout';
import { WorkflowWidget } from './WorkflowWidget';

export interface WorkflowStep {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: string;
  iconFileName: string;
  widgets: WorkflowWidget[];
  events: WorkflowEvent[];
  layouts: WorkflowLayout[];
}
