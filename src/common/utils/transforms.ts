/* eslint-disable @typescript-eslint/no-explicit-any */
import { WorkflowWidget } from '../types/WorkflowWidget';

export const transformWidget = (widget: WorkflowWidget) => {
  try {
    widget.extra = JSON.parse((widget.extra as any) || '{}');
  } catch {
    widget.extra = {};
  }

  try {
    widget.rules = JSON.parse((widget.rules as any) || '{}');
  } catch {
    widget.rules = {
      required: true,
      filter: '{}',
    };
  }

  return widget;
};
