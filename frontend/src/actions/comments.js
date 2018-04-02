import { COMMENTS_GET, COMMENTS_DELETE, POSTS_ADDED_COMMENT } from './types';
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

export function voteOnComment(comment, option) {
  return dispatch => {
    const url = `http://localhost:3001/comments/${comment.id}`

    return axios
      .post( url, { option: option }, { headers: headers } )
      .then( payload => dispatch(getCommentAsync(payload)) )
      .then( ({ payload }) => payload.data )
  }
}

export function updateComment(id, body) {
  return dispatch => {
    const url = `http://localhost:3001/comments/${id}`

    const data = {
      body: body,
      timestamp: Date.now()
    }

    return axios
      .put( url, data, { headers: headers } )
      .then( payload => dispatch(getCommentAsync(payload)) )
      .then( ({ payload }) => payload.data )
  }
}

export function deleteComment({id}) {
  return dispatch => {
    const url = `http://localhost:3001/comments/${id}`

    return axios
      .delete( url, { headers: headers } )
      .then( () => dispatch(deleteCommentAsync(id)) )
  }
}

const getCommentAsync = payload => (
  { type: COMMENTS_GET, payload}
)

const deleteCommentAsync = id => (
  { type: COMMENTS_DELETE, id}
)

const addedCommentAsync = id => (
  { type: POSTS_ADDED_COMMENT, id}
)
