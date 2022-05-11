import { Ref } from 'vue';
import { WorkflowEvent } from './WorkflowEvent';
import { WorkflowLayout } from './WorkflowLayout';
import { WorkflowWidget } from './WorkflowWidget';

export interface WorkflowStepMeta {
  name: string;
  icon: string;
  iconFileName: string;
  widgets: WorkflowWidget[];
  events: WorkflowEvent[];
  layouts: WorkflowLayout[];
}

export interface WorkflowMachine {
  stepInfo: Ref<WorkflowStepMeta>;
  data: Record<string, any>;
  updateData(field: string, value: any): void;
  sendEvent(event: string): void;
}
