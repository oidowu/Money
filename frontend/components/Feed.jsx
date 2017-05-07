import React from 'react';
import { connect } from 'react-redux';
import ArticleItem from './ArticleItem';
import { fetchUserFeed } from '../actions/feed_actions';
import { feedArticles } from '../reducers/articlesReducer';

class Feed extends React.Component {
  componentDidMount() {
    this.props.fetchUserFeed();
  }

  recordView(article_id) {
    return () => {
      return $.ajax({
        method: 'POST',
        data: { article_view: { article_id }},
        url: '/api/article_views'
      });
    };
  }

  render() {
    return (
      <section id="feed-box">

        <ul className="article-list">
          {this.props.articles.map(article => {
            return (
              <ArticleItem key={article.id}
                recordView={this.recordView(article.id)}
                article={article}/>
            );
          })}
        </ul>
      </section>
    );
  }
}

function mapStateToProps({ articles }) {
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
