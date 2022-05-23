import { SelectOption } from '../types/SelectOption';

export const validationTypes: SelectOption[] = [
  { value: 'required', label: 'Required' },
  { value: 'min', label: 'Minimum' },
  { value: 'max', label: 'Maximum' },
  { value: 'minlen', label: 'Minmimum Length' },
  { value: 'maxlen', label: 'Maximum Length' },
  { value: 'dynamic', label: 'Dynamic' },
];
