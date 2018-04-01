import { CATEGORIES_INDEX } from './types';
import axios from 'axios';

export function getCategories() {
  return dispatch => {

    const headers = { 'Authorization': 'whatever-you-want' };
    axios.get('http://localhost:3001/categories', {headers: headers})
      .then(posts => {
        dispatch(getCategoriesAsync(posts));
      });
  }
}

function getCategoriesAsync(posts){
  return {
    type: CATEGORIES_INDEX,
    payload: posts
  };
}
