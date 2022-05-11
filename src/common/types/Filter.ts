export interface Filter {
  op: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'and' | 'or';
  field: string;
  value: string;
  children: Filter[];
}
