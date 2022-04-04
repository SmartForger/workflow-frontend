import { WorkflowWidgetType } from './WorkflowWidgetType';

export interface WorkflowWidget {
  type: WorkflowWidgetType;
  displayName: string;
  description: string;
  icon: string;
  field: string;
  updateEvent: string;
}
