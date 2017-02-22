import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './App';
// import Profile from './Profile';

export default function Root({ store }) {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
        </Route>
      </Router>
    </Provider>
  );
}
