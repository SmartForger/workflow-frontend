export interface WorkflowEvent {
  id: string;
  name: string;
  description: string;
  step: string;
  action: string;
  condition: string;
  stepId?: string;
}
