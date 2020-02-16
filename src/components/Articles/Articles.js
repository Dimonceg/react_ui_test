import React from "react";
import ArticleItem from './ArticleItem'

class Article extends React.Component {

  removeArticle = (id) => {
    const newState = this.props.state;
    const index = newState.articles.findIndex(article => article.id === id);
    if (index === -1) return;

    newState.articles.splice(index, 1);
    localStorage.setItem('articles', JSON.stringify(newState.articles))

    this.setState(newState);
  }

  render() {
    const articles = this.props.articles
    return (
      <div id="posts" className="well">
        {articles.map(article => {
          return <ArticleItem data={article} key={article.id} remove={this.removeArticle}/>
        })}
      </div>
    )
  }
}

export default Article;