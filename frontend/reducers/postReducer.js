import { RECEIVE_USER_FEED } from '../actions/feed_actions';
import { RECEIVE_POST } from '../actions/post_actions';
import { RECEIVE_PROFILE } from '../actions/user_actions';
import { merge, values } from 'lodash';

const initialState = {
  feed: {},
  general: {}
};

export default function postReducer(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_USER_FEED:
      return merge({}, state, { feed: action.posts });
    case RECEIVE_POST:
      return merge({}, state, { general: {[action.post.id]: action.post } });
    case RECEIVE_PROFILE:
      return merge({}, state, { general: action.user.posts});
    default:
      return state;
  }
}


export function feedPosts(posts) {
  return values(posts.feed);
}

export function selectUserPosts(posts, id) {
  return values(posts.general).filter(post => {
    return post.author_id === id;
  });
}
