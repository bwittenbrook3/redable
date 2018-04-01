import { POSTS_INDEX, POSTS_GET, POSTS_ADDED_COMMENT } from '../actions/types';
import _ from 'lodash';

const getPosts = (state, { payload }) => (
  {
    ...state,
    ..._.keyBy(payload.data, 'id')
  }
)

const getPost = (state, { payload }) => (
  {
    ...state,
    [payload.data.id]: payload.data
  }
)

const commentAddedToPost = (state, { id }) => (
  {
    ...state,
    [id]: {
      ...state[id],
      commentCount: state[id].commentCount + 1
    }
  }
)

export default function(state={}, action) {
  switch (action.type) {
    case POSTS_INDEX:
      return getPosts(state, action)
    case POSTS_GET:
      return getPost(state, action);
    case POSTS_ADDED_COMMENT:
      return commentAddedToPost(state, action);
    default:
      return state;
  }
}
