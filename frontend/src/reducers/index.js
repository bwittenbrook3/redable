import { combineReducers } from 'redux';
import posts from './posts'
import categories from './categories'
import sortBy from './sortby'
import comments from './comments'

const rootReducer = combineReducers({
  posts,
  categories,
  comments,
  sortBy
});

export default rootReducer;
