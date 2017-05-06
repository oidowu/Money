import { RECEIVE_USER_FEED } from '../actions/feed_actions';
import { RECEIVE_ARTICLE } from '../actions/post_actions';
import { RECEIVE_PROFILE } from '../actions/user_actions';
import { merge, values } from 'lodash';

const initialState = {
  feed: {},
  general: {}
};

export default function postReducer(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_USER_FEED:
      return merge({}, state, { feed: action.articles });
    case RECEIVE_ARTICLE:
      return merge({}, state, { general: {[action.article.id]: action.article } });
    case RECEIVE_PROFILE:
      return merge({}, state, { general: action.user.articles});
    default:
      return state;
  }
}


export function feedArticles(articles) {
  return values(articles.feed);
}

export function selectUserArticles(articles, id) {
  return values(articles.general).filter(article => {
    return article.author_id === id;
  });
}
