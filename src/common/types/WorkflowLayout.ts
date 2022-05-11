import { WorkflowWidget } from './WorkflowWidget';

export interface WorkflowLayout {
  id: string;
  title: string;
  type: string;
  icon: string;
  iconFileName: string;
  backgroundColor: string;
  textColor: string;
  visible: boolean;
  stepId?: string;
  widgets: WorkflowWidget[];
}
