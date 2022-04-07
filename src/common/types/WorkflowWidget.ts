import { WorkflowWidgetType } from './WorkflowWidgetType';

export interface WorkflowWidget {
  id: string;
  type: WorkflowWidgetType;
  displayName: string;
  description: string;
  icon: string;
  iconFileName: string;
  field: string;
  updateEvent: string;
}
