import { COMMENTS_GET_SOME } from '../actions/types';
import _ from 'lodash';


export default function(state={}, action) {
  switch (action.type) {
    case COMMENTS_GET_SOME:
      return {
        ...state,
        ..._.keyBy(action.payload.data, 'id')
      }
    default:
      return state;
  }
}
