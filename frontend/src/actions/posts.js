import { POSTS_INDEX, POSTS_GET, POSTS_DELETE, COMMENTS_GET_MANY } from './types';
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

export function voteOnPost(post, option) {
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

export function editPost(id, post) {
  return dispatch => {
    const url = `http://localhost:3001/posts/${id}`

    const data = {
      title: post.title,
      body: post.body
    }

    return axios
      .put( url, data, { headers: headers } )
      .then( payload => dispatch(getPostAsync(payload)) )
      .then( ({ payload }) => payload.data )
  }
}

export function deletePost(id) {
  return dispatch => {
    const url = `http://localhost:3001/posts/${id}`

    return axios
      .delete( url, { headers: headers } )
      .then( () => dispatch(deletePostAsync(id)) )
  }
}

const getPostsAsync = payload => (
  { type: POSTS_INDEX, payload }
)

const getPostAsync = payload => (
  { type: POSTS_GET, payload }
)

const deletePostAsync = payload => (
  { type: POSTS_DELETE, payload}
)

const getCommentsAsync = payload => (
  { type: COMMENTS_GET_MANY, payload }
)
