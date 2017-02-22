import React from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions/session_actions';
import Header from './Header';
import SessionForm from './SessionForm';

export default class App extends React.Component {

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
      e.preventDefault();
      this.setState({formType: type});
    };
  }

  render() {
    return (
      <div id="whole-app">
        <Header showForm={this.showForm}/>
        <SessionForm formType={this.state.formType} showForm={this.showForm}/>
      </div>
    );
  }
}
