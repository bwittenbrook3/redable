import { POSTS_GET, POST_GET } from './types';
import axios from 'axios';

const headers = { 'Authorization': 'whatever-you-want' };

export function getPosts() {
  return dispatch => {
    return axios
      .get('http://localhost:3001/posts', {headers: headers} )
      .then( posts => dispatch(getPostsAsync(posts)) )
  }
}

export function getPost(id) {
  return dispatch => {
    return axios
      .get( `http://localhost:3001/posts/${id}`, {headers: headers} )
      .then( post => dispatch(getPostAsync(post)) )
  }
}

export function createPost(post) {
  return dispatch => {
    return axios
      .post( 'http://localhost:3001/posts', post, {headers: headers} )
      .then( post => dispatch(getPostAsync(post)) )
  }
}

export function vote(post, option) {
  return dispatch => {

    const url = `http://localhost:3001/posts/${post.id}`

    return axios
      .post( url, { option: option }, { headers: headers } )
      .then( post => dispatch(getPostAsync(post)) )
  }
}



function getPostsAsync(posts){
  return {
    type: POSTS_GET,
    payload: posts
  };
}

function getPostAsync(post) {
  return {
    type: POST_GET,
    payload: post
  };
}
