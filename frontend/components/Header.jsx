import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/session_actions';

function Header({showForm, user, logOut}) {

  function handleUser() {
    if (user) {
      return (
        [<span key="username">{user.username}</span>,
        <button onClick={logOut} key="log-out">Log Out</button>]
      );
    } else {
      return (
        [<button onClick={showForm("signUp")} key="sign-up">Sign Up</button>,
        <button onClick={showForm("logIn")} key="log-in">Log In</button>]
      );
    }
  }
  return (
    <navbar id="navbar">
      {handleUser()}
    </navbar>
  );
}

function mapStateToProps(state) {
  return {
    user: state.session.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logOut: () => dispatch(logOut())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
