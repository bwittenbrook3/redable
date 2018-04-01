import { CATEGORIES_INDEX } from '../actions/types';
import _ from 'lodash';


export default function(state=[], action) {

  switch (action.type) {
    case CATEGORIES_INDEX:
      return _.keyBy(action.payload.data.categories, 'name');

    default:
      return state;
  }
}
