import { COMMENTS_GET, POSTS_ADDED_COMMENT } from './types';
import axios from 'axios';

const headers = { 'Authorization': 'whatever-you-want' };

export function createComment(comment) {
  return dispatch => {
    const url = 'http://localhost:3001/comments'
    return axios
      .post(url, comment, {headers: headers} )
      .then( payload => dispatch(getCommentAsync(payload)) )
      .then( ({ payload }) => payload.data )
      .then( ({ parentId }) => dispatch(addedCommentAsync(parentId)))
  }
}

const getCommentAsync = payload => (
  { type: COMMENTS_GET, payload: payload}
)

const addedCommentAsync = id => (
  { type: POSTS_ADDED_COMMENT, id: id}
)
