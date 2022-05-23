import { ValidationRule } from './ValidationRule';
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
  extra?: Record<string, any> | null;
  rules?: ValidationRule[] | null;
  stepId?: string;
  layoutId?: string;
  order?: number | null;
}

export interface WorkflowInputWidget extends WorkflowWidget {
  extra?: {
    dense?: boolean;
    filled?: boolean;
    outlined?: boolean;
    rounded?: boolean;
    square?: boolean;
  };
}

export interface WorkflowSelectWidget extends WorkflowWidget {
  extra?: {
    dense?: boolean;
    filled?: boolean;
    outlined?: boolean;
    multiple?: boolean;
  };
}
