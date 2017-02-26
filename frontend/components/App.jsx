import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions/session_actions';
import Header from './Header';
import SessionForm from './SessionForm';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      formType: null
    };
    this.showForm = this.showForm.bind(this);
  }

  showForm(type) {
    return (e) => {
      this.setState({formType: type});
    };
  }

  children() {
    if (this.props.user) {
      return this.props.children;
    }
  }

  render() {
    return (
      <div id="whole-app">
        <Header showForm={this.showForm}/>
        <SessionForm formType={this.state.formType} showForm={this.showForm}/>
        {this.children()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.session.currentUser
  };
}

export default connect(mapStateToProps)(App);
