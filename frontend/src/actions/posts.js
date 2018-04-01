import { POSTS_INDEX, POSTS_GET, COMMENTS_GET_MANY } from './types';
import axios from 'axios';

const headers = { 'Authorization': 'whatever-you-want' };

export function getPosts() {
  return dispatch => {
    return axios
      .get('http://localhost:3001/posts', {headers: headers} )
      .then( payload => dispatch(getPostsAsync(payload)) )
      .then( ({ payload }) => payload.data )
  }
}

export function getPost(id) {
  return dispatch => {
    return axios
      .get( `http://localhost:3001/posts/${id}`, {headers: headers} )
      .then( payload => dispatch(getPostAsync(payload)) )
      .then( ({ payload }) => payload.data )
  }
}

export function createPost(post) {
  return dispatch => {
    return axios
      .post( 'http://localhost:3001/posts', post, {headers: headers} )
      .then( payload => dispatch(getPostAsync(payload)) )
      .then( ({ payload }) => payload.data )
  }
}

export function vote(post, option) {
  return dispatch => {
    const url = `http://localhost:3001/posts/${post.id}`

    return axios
      .post( url, { option: option }, { headers: headers } )
      .then( payload => dispatch(getPostAsync(payload)) )
      .then( ({ payload }) => payload.data )
  }
}

export function fetchPostComments(id) {
  return dispatch => {
    const url = `http://localhost:3001/posts/${id}/comments`

    return axios
      .get( url, { headers: headers } )
      .then( payload => dispatch(getCommentsAsync(payload)) )
      .then( ({ payload }) => payload.data )
  }
}

const getPostsAsync = payload => (
  { type: POSTS_INDEX, payload: payload}
)

const getPostAsync = payload => (
  { type: POSTS_GET, payload: payload}
)

const getCommentsAsync = payload => (
  { type: COMMENTS_GET_MANY, payload: payload }
)
