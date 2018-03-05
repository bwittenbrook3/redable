import { POSTS_GET } from './types';
import axios from 'axios';

export function getPosts() {
  return dispatch => {

    const headers = { 'Authorization': 'whatever-you-want' };
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
