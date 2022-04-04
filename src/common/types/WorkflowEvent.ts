export interface WorkflowEvent {
  name: string;
  description: string;
  step: number;
  action: string;
  condition: string;
}
