import * as FeedApiUtil from '../utils/feed_api_util.js';
export const RECEIVE_USER_FEED = "RECEIVE_USER_FEED";

export const receiveUserFeed = (articles) => {
  return {
    type: RECEIVE_USER_FEED,
    articles
  };
};

export const fetchUserFeed = () => dispatch => {
  return FeedApiUtil.fetchUserFeed().then(articles => dispatch(receiveUserFeed(articles)));
};
