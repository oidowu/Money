import * as PostApiUtil from '../utils/post_api_util';

export const RECEIVE_POST = "RECEIVE_POST";

export const createPost = post => dispatch => {
  return PostApiUtil.createPost(post).then(post => dispatch(receivePost(post)));
};

export const fetchPost = id => dispatch => {
  return PostApiUtil.fetchPost(id).then(post => dispatch(receivePost(post)));
};

export const receivePost = post => {
  return {
    type: RECEIVE_POST,
    post
  };
};
