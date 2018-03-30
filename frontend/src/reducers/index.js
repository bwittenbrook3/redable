import { combineReducers } from 'redux';
import posts from './posts'
import categories from './categories'
import sortBy from './sortby'

const rootReducer = combineReducers({
  posts,
  categories,
  sortBy
});

export default rootReducer;
