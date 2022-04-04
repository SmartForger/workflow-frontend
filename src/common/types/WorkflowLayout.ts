import { WorkflowWidget } from './WorkflowWidget';

export interface WorkflowLayout {
  title: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
  visible: boolean;
  widgets: WorkflowWidget[];
}
