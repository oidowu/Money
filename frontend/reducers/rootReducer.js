import { combineReducers } from 'redux';
import session from './sessionReducer';
import articles from './articlesReducer';
import users from './userReducer';

export default combineReducers({
  session,
  articles,
  users
});
