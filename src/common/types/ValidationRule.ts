export interface ValidationRule {
  id: string;
  type: string;
  message?: string;
  order?: number | null;
  extra?: Record<string, any>;
}
