import React from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/post_actions';

class PostShow extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.params.postId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.postId !== newProps.params.postId) {
      this.props.fetchPost(newProps.params.postId);
    }
  }

  render() {
    if (this.props.post) {

      return (
        <div>
          <span>
            {this.props.post.title}
          </span>
          <br/>
          <span>
            {this.props.post.body}
          </span>
        </div>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    post: state.posts.general[ownProps.params.postId]
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchPost: id => dispatch(fetchPost(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
