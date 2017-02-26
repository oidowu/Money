import React from 'react';
import { connect } from 'react-redux';
import { signUp, logIn, clearErrors } from '../actions/session_actions';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      imageFile: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.closeAndClear = this.closeAndClear.bind(this);
  }

  handleChange(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }


  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user[username]", this.state.username);
    formData.append("user[password]", this.state.password);
    if (this.state.imageFile) {
      formData.append("user[avi]", this.state.imageFile);
    }
    this.props.processForm(formData)
      .then(() => this.setState({username: "", password: "", imageFile: null}))
      .then(() => this.props.showForm(null)());
  }

  usernameClass() {
    if (this.props.errors.username) {
      return "error";
    }
  }

  userErrors() {
    const { username } = this.props.errors;
    if (username) {
      return (
        <ul>
          {
            username.map(error => {
              return <li>Username {error}</li>;
            })
          }
        </ul>
      );
    }
  }

  passwordErrors() {
    const { password } = this.props.errors;
    if (password) {
      return (
        <ul>
          {
            password.map(error => {
              return <li>Password {error}</li>;
            })
          }
        </ul>
      );
    }
  }

  handleImage(e) {
    const file = e.currentTarget.files[0];
    this.setState({imageFile: file});
  }

  passwordClass() {
    if (this.props.errors.password) {
      return "error";
    }
  }

  closeAndClear() {
    this.props.clearErrors();
    this.props.showForm(null)();
  }

  imageUpload() {
    if (this.props.formType === "signUp") {
      return <input type="file" onChange={this.handleImage}/>;
    }
  }



  render() {
    if (this.props.formType) {
      return (
        <div className="modal-backdrop" onClick={this.closeAndClear}>
          <form className="session-form" onClick={e => e.stopPropagation()}>
            <label htmlFor="username">
              Username
            </label>
            {this.userErrors()}
            <input type="text" id="username" autoFocus
              placeholder="username"
              className={this.usernameClass()}
              ref={input => this.username = input}
              onChange={this.handleChange("username")}
              value={this.state.username}/>
            <label htmlFor="password">
              Password
            </label>
            {this.passwordErrors()}
            <input type="password" id="password"
              placeholder="******"
              className={this.passwordClass()}
              onChange={this.handleChange("password")}
              value={this.state.password}/>
            {this.imageUpload()}
            <button onClick={this.handleSubmit}>Submit Form</button>
            <button id="close-modal-button" onClick={this.closeAndClear}>X</button>
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
    processForm: user => dispatch(processForm(user)),
    clearErrors: () => dispatch(clearErrors())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
