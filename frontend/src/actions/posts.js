import { POSTS_GET, POST_GET } from './types';
import axios from 'axios';

const headers = { 'Authorization': 'whatever-you-want' };

export function getPosts() {
  return dispatch => {
    axios.get('http://localhost:3001/posts', {headers: headers})
      .then(posts => {
        dispatch(getPostsAsync(posts));
      });
  }
}

function getPostsAsync(posts){
  return {
    type: POSTS_GET,
    payload: posts
  };
}

export function createPost(post) {
  return dispatch => {
    return axios.post(
        'http://localhost:3001/posts',
        post, {headers: headers}
      )
      .then(post => dispatch(createPostAsync(post)) )
  }
}

function createPostAsync(post) {
  return {
    type: POST_GET,
    payload: post
  };
}

export function vote(post, option) {
  return dispatch => {

    axios
      .post(`http://localhost:3001/posts/${post.id}`,
        { option: option },
        { headers: headers }
      )
      .then(post => {
        dispatch(voteAsync(post));
      })
    ;
  }
}

function voteAsync(post){
  return {
    type: POST_GET,
    payload: post
  };
}
