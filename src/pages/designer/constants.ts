import { WorkflowWidgetType } from 'src/common/types/WorkflowWidgetType';

export const workflowCategories = [
  'Cargo Security',
  'Freight Forwarding',
  'Warehouse Handling',
];

export const workflowVerticals = ['Cargo Screening', 'C-TAPT'];

export const workflowModes = ['Single Shipments', 'Containerized Shipments'];

export const widgetTypeOptions = [
  WorkflowWidgetType.INPUT,
  WorkflowWidgetType.SELECT,
  WorkflowWidgetType.LIST,
  WorkflowWidgetType.TABLE,
  WorkflowWidgetType.SIGNATURE,
  WorkflowWidgetType.VIDEO,
];

export const eventActions = [
  'Send Email',
  'Take Photo',
  'Record Video',
  'Enter Comment',
  'Live Screening',
  'Share Photo',
  'Share Video',
  'Send Chat Message',
];
