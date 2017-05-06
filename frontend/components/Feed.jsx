import React from 'react';
import { connect } from 'react-redux';
import { fetchUserFeed } from '../actions/feed_actions';
import { feedArticles } from '../reducers/articlesReducer';

class Feed extends React.Component {
  componentDidMount() {
    this.props.fetchUserFeed();
  }

  render() {
    return (
      <ul>
        {this.props.articles.map(post => {
          return <li key={post.id}><a href={post.url}>{post.title}</a></li>;
          })}
        </ul>
    );
  }
}

function mapStateToProps({articles}) {
  return {
    articles: feedArticles(articles)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserFeed: () => dispatch(fetchUserFeed())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
