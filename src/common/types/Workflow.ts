import { WorkflowStep } from './WorkflowStep';

export interface Workflow {
  id: string;
  category: string | null;
  subCategory: string | null;
  name: string;
  mode: string[];
  description: string | null;
  icon: string;
  iconFileName: string;
  steps: WorkflowStep[];
}
