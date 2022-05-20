/* eslint-disable @typescript-eslint/no-explicit-any */

import { Filter } from '../types/Filter';
import { checkFilter } from './filter';

export const required = () => (val: any) => !!val || 'Field is required';

export const checkFilterValidation = (filter: Filter) => (val: any) => checkFilter(val, filter);

export const arrayRequired = () => (val: any) => (val && !!val.length) || 'Field is required';
