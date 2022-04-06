import { WorkflowWidgetType } from 'src/common/types/WorkflowWidgetType';

export const workflowCategories = [
  'Cargo Security',
  'Freight Forwarding',
  'Warehouse Handling',
];

export const workflowVerticals = ['Cargo Screening', 'C-TAPT'];

export const workflowModes = ['Single Shipments', 'Containerized Shipments'];

export const widgetTypeOptions = [
  { label: 'Input', value: WorkflowWidgetType.INPUT },
  { label: 'Select', value: WorkflowWidgetType.SELECT },
  { label: 'List', value: WorkflowWidgetType.LIST },
  { label: 'Table', value: WorkflowWidgetType.TABLE },
  { label: 'Signature', value: WorkflowWidgetType.SIGNATURE },
  { label: 'Video', value: WorkflowWidgetType.VIDEO },
];
