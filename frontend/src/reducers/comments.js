import { COMMENTS_GET, COMMENTS_GET_MANY } from '../actions/types';
import _ from 'lodash';


export default function(state={}, action) {
  switch (action.type) {
    case COMMENTS_GET:
      return {
        ...state,
        [action.payload.data.id]: action.payload.data
      }
    case COMMENTS_GET_MANY:
      return {
        ...state,
        ..._.keyBy(action.payload.data, 'id')
      }
    default:
      return state;
  }
}
