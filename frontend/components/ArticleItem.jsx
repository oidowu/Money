import React from 'react';

export default function ArticleItem({ article,  recordView }) {
  function articleViewers() {
    return (
      article.viewers.map(viewer => {
        return (
          <div key={viewer.id} className="article-viewer-container">
            <img
              src={viewer.image_url}
              className="article-viewer"/>
            <span>{viewer.username}</span>
          </div>
        );
      })
    );
  }
  return (
    <li key={article.id}
      onClick={recordView}
      className="article-item">
      <section className="flex">
        <img className="article-pic" src={article.image_url}/>
        <a href={article.url} className="article-title">{article.title}</a>
      </section>
      <ul className="flex viewer-list">

        {articleViewers()}
      </ul>
    </li>
  );
}
