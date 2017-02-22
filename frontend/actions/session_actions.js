import * as SessionApiUtil from '../utils/session_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEVIEV_ERRORS,
    errors
  };
};

export const signUp = user => dispatch => {
  return SessionApiUtil.signUp(user).then(
    user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  );
};

export const logIn = user => dispatch => {
  return SessionApiUtil.logIn(user).then(
    user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  );
};

export const logOut = () => dispatch => {
  return SessionApiUtil.logOut().then(() => dispatch(receiveUser(null)));
};
