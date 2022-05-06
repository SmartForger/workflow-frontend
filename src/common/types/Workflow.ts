import { WorkflowStep } from './WorkflowStep';

export interface Workflow {
  id: string;
  category: string;
  subCategory: string;
  name: string;
  mode: string[];
  description: string;
  icon: string;
  iconFileName: string;
  steps: WorkflowStep[];
}
