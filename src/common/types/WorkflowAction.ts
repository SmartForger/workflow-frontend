export interface WorkflowAction {
  id: string;
  type: 'transaction' | 'milestone';
  name: string;
  code: string;
  content: string;
  components: string[];
}
