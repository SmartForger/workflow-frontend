export interface WorkflowEventCondition {
  id: string;
  name: string;
  filterJson: string;
  eventId?: string;
  order?: number | null;
}
