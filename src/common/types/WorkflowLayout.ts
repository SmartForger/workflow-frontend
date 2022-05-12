import { WorkflowWidget } from './WorkflowWidget';

export interface WorkflowLayout {
  id: string;
  title: string;
  type: string;
  icon: string | null;
  iconFileName: string | null;
  backgroundColor: string | null;
  textColor: string | null;
  visible: boolean | null;
  stepId?: string;
  widgets: WorkflowWidget[];
}
