import { merge } from 'lodash';
import { RECEIVE_USER, RECEIVE_ERRORS } from '../actions/session_actions';

const initialState = {
  currentUser: null,
  errors: []
};

export default function sessionReducer(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_USER:
      return merge({}, state, {currentUser: action.user});
    case RECEIVE_ERRORS:
      return { currentUser: null, errors: action.errors};
    default:
      return state;
  }
}
