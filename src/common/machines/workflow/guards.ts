/* eslint-disable @typescript-eslint/no-explicit-any */
import { Filter } from 'src/common/types/Filter';
import { checkFilter } from 'src/common/utils/filter';

const checkCondition = (context: any, ev: any, meta: any) => {
  return meta.cond.filters.every((filter: Filter) => checkFilter(context, filter));
};

export default {
  guards: { checkCondition },
};
