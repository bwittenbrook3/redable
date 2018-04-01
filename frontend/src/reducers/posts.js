import { POSTS_GET, POST_GET } from '../actions/types';
import _ from 'lodash';


function insertPost(state, action) {
  const post = action.payload.data;
  return {
    ...state,
    [post.id]: post
  }
}

export default function(state={}, action) {
  switch (action.type) {
    case POSTS_GET:
      return _.keyBy(action.payload.data, 'id');
    case POST_GET:
      return insertPost(state, action);
    default:
      return state;
  }
}
