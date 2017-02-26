import { merge } from 'lodash';
import { RECEIVE_PROFILE } from '../actions/user_actions';

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_PROFILE:
      return merge({}, state, {[action.user.id]: action.user});
    default:
      return state;
  }
}
