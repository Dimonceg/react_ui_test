import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import articles from './posts.json'

import Header from './components/Header'
import Articles from './components/Articles';
import Form from './components/Form';

class App extends React.Component {

  state = {
    articles: articles
  }

  handleArticles = (newArticle) => {
    this.setState({ 
      articles: [...this.state.articles, newArticle] 
    })
  }

  componentDidMount() {
    const store = JSON.parse(localStorage.getItem('articles')) || []

    if(store.length) {
      this.setState({ 
        articles: [...store] 
      })
    }
    else {
      localStorage.setItem('articles', JSON.stringify(articles))
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <section>
            <Articles articles={this.state.articles} state={this.state} />
          </section>
          <Form addArticle={this.handleArticles} />
        </div>
      </div>
    );
  }
}

export default App;
