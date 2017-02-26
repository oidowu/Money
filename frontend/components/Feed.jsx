import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchUserFeed } from '../actions/feed_actions';
import { feedPosts } from '../reducers/postReducer';

class Feed extends React.Component {
  componentDidMount() {
    this.props.fetchUserFeed();
  }

  render() {
    console.log(this.props.posts);
    return (

      <ul>
        {this.props.posts.map(post => {
          return <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>;
          })}
        </ul>
    );
  }
}

function mapStateToProps({posts}) {
  return {
    posts: feedPosts(posts)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserFeed: () => dispatch(fetchUserFeed())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
