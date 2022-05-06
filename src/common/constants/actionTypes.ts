import { keyBy } from 'lodash';
import { SelectOption } from '../types/SelectOption';

export const actionTypes: SelectOption[] = [
  { value: 'milestone', label: 'Milestone' },
  { value: 'transaction', label: 'Transaction' },
];

export const actionTypesByValue = keyBy(actionTypes, 'value');
