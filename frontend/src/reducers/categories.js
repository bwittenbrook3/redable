import { CATEGORIES_INDEX } from '../actions/types';
import _ from 'lodash';

const getCategories = (state, { payload }) =>
  _.keyBy(payload.data.categories, 'name')

export default function(state=[], action) {
  switch (action.type) {
    case CATEGORIES_INDEX:
      return getCategories(state, action);
    default:
      return state;
  }
}
