import { COMMENTS_GET, COMMENTS_DELETE, COMMENTS_GET_MANY } from '../actions/types';
import _ from 'lodash';


const getComment = (state, { payload }) => (
  {
    ...state,
    [payload.data.id]: payload.data
  }
)

const getManyComments = (state, { payload }) => (
  {
    ...state,
    ..._.keyBy(payload.data, 'id')
  }
)

const deleteComment = (state, { id }) => _.omit(state, [id])

export default function(state={}, action) {
  switch (action.type) {
    case COMMENTS_GET:
      return getComment(state, action)
    case COMMENTS_DELETE:
      return deleteComment(state, action)
    case COMMENTS_GET_MANY:
      return getManyComments(state, action)
    default:
      return state;
  }
}
