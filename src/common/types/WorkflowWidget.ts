import { WorkflowWidgetType } from './WorkflowWidgetType';

export interface WorkflowWidget {
  id: string;
  type: WorkflowWidgetType;
  name: string;
  description: string;
  icon: string;
  iconFileName: string;
  field: string;
  updateEvent: string;
  stepId?: string;
  layoutId?: string;
}
