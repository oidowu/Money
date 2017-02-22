import React from 'react';
import { connect } from 'react-redux';
import { signUp, logIn } from '../actions/session_actions';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }


  handleSubmit(e) {
    e.preventDefault();
    e.persist();
    this.props.processForm(this.state)
      .then(() => this.setState({username: "", password: ""}))
      .then(() => this.props.showForm(null)(e));
  }


  render() {
    if (this.props.formType) {
      return (
        <div className="modal-backdrop" onClick={this.props.showForm(null)}>
          <form className="session-form" onClick={e => e.stopPropagation()}>
            <label htmlFor="username">
              Username
            </label>
            <input type="text" id="username" autoFocus
              ref={input => this.username = input}
              onChange={this.handleChange("username")}
              value={this.state.username}/>
            <label htmlFor="password">
              Password
            </label>
            <input type="password" id="password"
              onChange={this.handleChange("password")}
              value={this.state.password}/>
            <button onClick={this.handleSubmit}>Submit Form</button>
            <button id="close-modal-button" onClick={this.props.showForm(null)}>X</button>
          </form>

      </div>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    errors: state.session.errors
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  const processForm = ownProps.formType === "logIn" ? logIn : signUp;

  return {
    processForm: (user) => dispatch(processForm(user))
  };
}

export default connect(null, mapDispatchToProps)(App);
