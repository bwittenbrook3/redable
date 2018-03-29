import { POSTS_GET, POSTS_VOTE } from '../actions/types';
import _ from 'lodash';


export default function(state={}, action) {

  switch (action.type) {
    case POSTS_GET:
      return _.keyBy(action.payload.data, 'id');
    case POSTS_VOTE:
      const post = action.payload.data;
      return {
        ...state,
        [post.id]: post
      }
    default:
      return state;
  }
}
