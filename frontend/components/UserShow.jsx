import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchProfile } from '../actions/user_actions';
import { createPost } from '../actions/post_actions';
import { selectUserPosts } from '../reducers/articlesReducer';

class UserShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.fetchProfile(this.props.params.userId);
  }

  update(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.userId !== this.props.params.userId) {
      this.props.fetchProfile(newProps.params.userId);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createPost(this.state).then(() => this.setState({title: "", body: ""}));

  }

  form() {
    if (this.props.user.id === currentUser.id) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.title} onChange={this.update("title")}/>
          <input type="text" value={this.state.body} onChange={this.update("body")}/>
          <button>Do it</button>
        </form>
      );
    }
  }
  render() {

    if (this.props.user) {
      return (
        <div>
          {this.form()}
          <ul>
            {
              this.props.posts.map(post => {
                return <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>;
                })
              }
            </ul>
        </div>

      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.users[ownProps.params.userId],
    posts: selectUserPosts(state.posts, parseInt(ownProps.params.userId)),
    currentUser: state.session.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProfile: (id) => dispatch(fetchProfile(id)),
    createPost: (post) => dispatch(createPost(post))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
