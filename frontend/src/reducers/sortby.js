import { SORT_BY } from '../actions/types';


const initialState = 'voteScore'

export default function(state = initialState, action) {

  switch (action.type) {
    case SORT_BY:
      return action.payload
    default:
      return state;
  }
}
