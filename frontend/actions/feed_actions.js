import * as FeedApiUtil from '../utils/feed_api_util.js';
export const RECEIVE_USER_FEED = "RECEIVE_USER_FEED";

export const receiveUserFeed = (posts) => {
  return {
    type: RECEIVE_USER_FEED,
    posts
  };
};

export const fetchUserFeed = () => dispatch => {
  return FeedApiUtil.fetchUserFeed().then(posts => dispatch(receiveUserFeed(posts)));
};
