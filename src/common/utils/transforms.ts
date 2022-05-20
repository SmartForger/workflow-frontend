import { WorkflowWidget } from '../types/WorkflowWidget';

export const transformWidget = (widget: WorkflowWidget) => {
  try {
    widget.extra = JSON.parse((widget.extra as any) || '{}');
  } catch {
    widget.extra = {};
  }

  return widget;
};
