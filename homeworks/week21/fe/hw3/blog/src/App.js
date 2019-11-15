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
      <text textAnchor="middle" x="50" y="15" fill="url(#gradient)" fillOpacity="0.4">{about}</text>
      <text textAnchor="middle" x="50" y="15" fill="url(#wave)" fillOpacity="0.7">{about}</text>
    </svg>
  </div>
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      id: null,
      articles: []
    };

    this.handleArticle = this.handleArticle.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleArticle(articleId) {
    this.setState({
      id: articleId,
    })
  }

  handleBack() {
    this.setState({
      id: null,
    })
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            articles: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, articles, id } = this.state;
    const article = articles.find(article => article.id == id);
    console.log(id)
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className={id === null ? 'list__group' : 'article'}>

          {id === null ? articles.map(article => (
            <div key={article.id} className='list' onClick={() => this.handleArticle(article.id)}>
              {article.title}
            </div>
          ))
            :
            <div className='article'>
              <div className='article__title'>
                {article.title}
              </div>
              <div>
                {article.body}
              </div>
              <div>
                {article.userId}
              </div>
              <button onClick={this.handleBack}>Back</button>
            </div>
          }
        </div >
      );
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: 'list',
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, y) {
    this.setState({
      post: e.target.name,
    })
  }

  render() {
    const { post } = this.state;
    return (
      <div className='wrapper'>
        <header>
          <div className="container">
            <div className='header__img'></div>
            <nav>
              <ul>
                <li>
                  <a onClick={this.handleClick} name='about'>ABOUT</a>
                </li>
                <li>
                  <a onClick={(e) => this.handleClick(e, null)} name='list'>LIST</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          {post === 'about' ? <About /> : ''}
          {post === 'list' ? <List /> : ''}
        </main>
        <footer>Made by Ponchimeow</footer>
      </div>
    );
  }
}

export default App;
