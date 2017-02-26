import * as UserApiUtil from '../utils/user_api_util';
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";

export const fetchProfile = id => dispatch => {
  return UserApiUtil.fetchProfile(id).then(user => dispatch(receiveProfile(user)));
};

export const receiveProfile = user => {
  return {
    type: RECEIVE_PROFILE,
    user
  };
};
