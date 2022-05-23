/* eslint-disable @typescript-eslint/no-explicit-any */

import { Filter } from '../types/Filter';
import { ValidationRule } from '../types/ValidationRule';
import { checkFilter } from './filter';

export const required = (msg?: string) => (val: any) => !!val || msg || 'Field is required';

export const checkFilterValidation = (filter: Filter, msg?: string) => (val: any) =>
  checkFilter(val, filter) || msg || 'Invalid value';

export const arrayRequired = (msg?: string) => (val: any) =>
  (val && !!val.length) || msg || 'Field is required';

export const minLength = (len: number, msg?: string) => (val: any) =>
  (typeof val === 'string' && val.length >= len) || msg || `Minimum length: ${len}`;

export const maxLength = (len: number, msg?: string) => (val: any) =>
  (typeof val === 'string' && val.length <= len) || msg || `Maximum length: ${len}`;

export const minValue = (value: number, msg?: string) => (val: any) => {
  const num = parseFloat(val);
  return num >= value || msg || `Minimum value: ${value}`;
};

export const maxValue = (value: number, msg?: string) => (val: any) => {
  const num = parseFloat(val);
  return num <= value || msg || `Maximum value: ${value}`;
};

export const getValidationsFromRules = (rules: ValidationRule[] | null | undefined) => {
  if (!rules) {
    return [];
  }

  return rules.map((rule) => {
    switch (rule.type) {
      case 'required':
        return required(rule.message);
      case 'minlen':
        return minLength(rule.extra?.length, rule.message);
      case 'maxlen':
        return maxLength(rule.extra?.length, rule.message);
      case 'min':
        return minValue(rule.extra?.value, rule.message);
      case 'max':
        return maxValue(rule.extra?.value, rule.message);
      case 'dynamic': {
        if (rule.extra?.filter) {
          try {
            const filter = JSON.parse(rule.extra?.filter);
            return checkFilterValidation(filter, rule.message);
          } catch {}
        }
        return () => true;
      }
      default:
        return () => true;
    }
  });
};
