import { POSTS_GET } from '../actions/types';
import _ from 'lodash';


export default function(state=[], action) {

  switch (action.type) {
    case POSTS_GET:
      return _.keyBy(action.payload.data, 'id');

    default:
      return state;
  }
}
