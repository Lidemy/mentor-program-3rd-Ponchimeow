import React, { Component } from 'react';

function About() {
  const about = '五十鈴川';
  return <div className='about'>
    <svg width="400" height="200" viewBox="30 -5 40 40">
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
      ).then(
        (error) => {
          this.setState({
            error,
            isLoaded: true,
          });
        }
      )
  }

  render() {
    const { error, isLoaded, articles } = this.state;
    const { handleArticle } = this.props;
    if (error) {
      return <div>{error}</div>;
    }
    else if (!isLoaded) {
      return <div className='loading'>loading...</div>;
    }
    else {
      return (
        <div className='list__group'>
          {articles.map(article =>
            <div key={article.id} className='list' onClick={(e) => handleArticle(e, article.id, 'article')}>
              {article.title}
            </div>)}
        </div >
      );
    }
  }
}

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: []
    };
    this.id = this.props;
    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.id = '';
  }

  componentDidMount() {
    const { id } = this.props;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            article: result
          });
        },
        (error) => {
          this.setState({
            error,
            isLoaded: true,
          });
        }
      )
  }

  render() {
    const { error, isLoaded, article } = this.state;
    const { handleArticle } = this.props;
    if (error) {
      return <div>{error}</div>;
    }
    else if (!isLoaded) {
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
          <button onClick={(e) => handleArticle(e, '', '')}>Back</button>
        </div>)
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
    }
    this.id = null;

    this.handleArticle = this.handleArticle.bind(this);
  }

  handleArticle(e, id, post) {
    this.setState({
      post,
    })
    this.id = id
  }

  switchPost = (post) => {
    switch (post) {
      case 'about':
        return <About />
      case 'article':
        return <Article id={this.id} handleArticle={this.handleArticle} />
      case '': default:
        return <List handleArticle={this.handleArticle} />
    }
  }

  render() {
    const { post } = this.state;
    return (
      <div className='wrapper'>
        <header>
          <div className="container">
            <div className='header__img'></div>
            <div className='navbar'>
              <div className='navbar__btn navbar__btn__about' onClick={(e) => this.handleArticle(e, '', 'about')}>
                ABOUT
              </div>
              <div className='navbar__btn navbar__btn__list' onClick={(e) => this.handleArticle(e, '', '')}>
                LIST
              </div>
            </div>
          </div >
        </header >
        <main>
          <div className='main__background'></div>
          <div className='main__content'>{this.switchPost(post)}</div>
        </main>
        <footer>Made by Ponchimeow</footer>
      </div >
    );
  }
}

export default App;
