import { get } from 'lodash';
import { Filter } from 'src/common/types/Filter';

export const checkFilter = (data: any, filter: Filter): boolean => {
  switch (filter.op) {
    case 'and':
      return filter.children?.every((child) => checkFilter(data, child));
    case 'or':
      return filter.children?.some((child) => checkFilter(data, child));
    case 'eq':
      return get(data, filter.field.split('.')) === filter.value;
    case 'neq':
      return get(data, filter.field.split('.')) !== filter.value;
    case 'gt':
      return get(data, filter.field.split('.')) > filter.value;
    case 'gte':
      return get(data, filter.field.split('.')) >= filter.value;
    case 'lt':
      return get(data, filter.field.split('.')) < filter.value;
    case 'lte':
      return get(data, filter.field.split('.')) <= filter.value;
    default:
      return true;
  }
};
