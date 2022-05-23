import { get } from 'lodash';
import { Filter } from 'src/common/types/Filter';

export const checkFilter = (data: any, filter: Filter): boolean => {
  const value = filter.field ? get(data, filter.field.split('.')) : data;

  switch (filter.op) {
    case 'and':
      return filter.children?.every((child) => checkFilter(data, child));
    case 'or':
      return filter.children?.some((child) => checkFilter(data, child));
    case 'eq':
      return value === filter.value;
    case 'neq':
      return value !== filter.value;
    case 'gt':
      return value > filter.value;
    case 'gte':
      return value >= filter.value;
    case 'lt':
      return value < filter.value;
    case 'lte':
      return value <= filter.value;
    default:
      return true;
  }
};
