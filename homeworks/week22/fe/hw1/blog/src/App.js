import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link,
} from "react-router-dom";

function About() {
  const about = '五十鈴川';
  return <div className='about'>
    <svg className='svg-about' width="400" height="200" viewBox="30 -10 40 40">
      <defs>
        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="10%" stopColor="#58B2DC" />
          <stop offset="95%" stopColor="#81C7D4" />
        </linearGradient>
        <pattern id="wave" x="0" y="0" width="120" height="20" patternUnits="userSpaceOnUse">
          <path id="wavePath" d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z" mask="url(#mask)" fill="url(#gradient)">
            <animateTransform
              attributeName="transform"
              begin="0s"
              dur="2.5s"
              type="translate"
              from="0,0"
              to="40,0"
              repeatCount="indefinite" />
          </path>
        </pattern>
      </defs>
      <text textAnchor="middle" x="50" y="15" fill="url(#gradient)" fillOpacity="0.5">{about}</text>
      <text textAnchor="middle" x="50" y="15" fill="url(#wave)" fillOpacity="0.8">{about}</text>
    </svg>
  </div>
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      articles: []
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            articles: result,
          });
        }
      )
  }

  render() {
    const { error, isLoaded, articles } = this.state;
    if (error) {
      return <div>{error}</div>;
    }
    else if (!isLoaded) {
      return <div className='loading'>loading...</div>;
    }
    else {
      return (
        <div className='list-group'>
          {articles.map(article =>
            <Link key={article.id} className='list-group__item' to={`/article/${article.id}`}>
              <div className='list-group__id'>{article.id}</div>
              <div className='list-group__title'>{article.title}</div>
            </Link>)}
        </div >
      );
    }
  }
}

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      id: this.props.match.params.articleId
    };
  }

  handleBack = () => {
    this.id = '';
  }

  componentDidMount() {
    const { id } = this.state;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            article: result
          });
        }
      )
  }

  render() {
    const { error, isLoaded, article } = this.state;
    if (error) {
      return <div>{error}</div>;
    }
    else if (isLoaded) {
      return <div className='loading'>loading...</div>;
    }
    else {
      return (
        <div className='article'>
          <div className='article__title'>
            Title: {article.title}
          </div>
          <div className='article__content'>
            {article.body}
          </div>
          <div className='article__user'>
            User: {article.userId}
          </div>
          <Link className='btn__back' to={'/list'}>Back</Link>
        </div>)
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      id: ''
    }
  }

  render() {
    return (
      <Router>
        <div className='wrapper'>
          <header>
            <div className="container">
              <div className='header__img'></div>
              <div className='navbar'>
                <Link className='navbar__btn navbar__btn__about' to={'/about'}>
                  ABOUT
              </Link>
                <Link className='navbar__btn navbar__btn__list' to={'/list'}>
                  LIST
              </Link>
              </div>
            </div >
          </header >
          <main>
            <div className='main__background'></div>
            <div className='main__content'>
              <Route exact path='/' component={List} />
              <Route path='/about' component={About} />
              <Route path='/list' component={List} />
              <Route path='/article/:articleId' component={Article} />
            </div>
          </main>
          <footer>Made by Ponchimeow</footer>
        </div >
      </Router>
    );
  }
}

export default App;
