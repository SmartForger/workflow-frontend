import { WorkflowWidget } from './WorkflowWidget';

export interface WorkflowLayout {
  id: string;
  title: string;
  icon: string;
  iconFileName: string;
  backgroundColor: string;
  textColor: string;
  visible: boolean;
  widgets: WorkflowWidget[];
}
