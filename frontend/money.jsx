import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './store';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("react-content");
  let store;
  if (window.currentUser) {
    store = configureStore({ session: { currentUser, errors: [] }});
  } else {
    store = configureStore();
  }
  window.store = store;
  ReactDOM.render(<Root store={store}/>, root);
});
