import { WorkflowWidgetType } from './WorkflowWidgetType';

export interface WorkflowWidget {
  id: string;
  type: WorkflowWidgetType;
  name: string;
  description: string | null;
  icon: string | null;
  iconFileName: string | null;
  field: string | null;
  event: string | null;
  stepId?: string;
  layoutId?: string;
}
