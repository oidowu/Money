import { combineReducers } from 'redux';
import session from './sessionReducer';
import posts from './postReducer';
import users from './userReducer';

export default combineReducers({
  session,
  posts,
  users
});
