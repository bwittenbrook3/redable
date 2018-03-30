import { SORT_BY } from './types';

export function sortBy(item) {
  return {
    type: SORT_BY,
    payload: item
  };
}
