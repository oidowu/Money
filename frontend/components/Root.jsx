import React from 'react';
import { Route, Router, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import App from './App';
import Feed from './Feed';
import UserShow from './UserShow';
import PostShow from './PostShow';

export default function Root({ store }) {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Feed}/>
          <Route path="users/:userId" component={UserShow}/>
          <Route path="posts/:postId" component={PostShow}/>
        </Route>
      </Router>
    </Provider>
  );
}
