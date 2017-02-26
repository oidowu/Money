import { merge } from 'lodash';
import { RECEIVE_USER, RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/session_actions';

const initialState = {
  currentUser: null,
  errors: {}
};

export default function sessionReducer(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_USER:
      return merge({}, state, {currentUser: action.user});
    case RECEIVE_ERRORS:
      return { currentUser: null, errors: action.errors};
    case CLEAR_ERRORS:
      const newState = merge({}, state, { errors: {} });
      newState.errors = {};
      return newState;
    default:
      return state;
  }
}
