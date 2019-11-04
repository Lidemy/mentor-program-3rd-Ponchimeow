import React, { Component } from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <button className="square" onClick={() => this.setState({ value: 'O' })}>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  // renderSquare(i) {
  //   return <Square value={i} />;
  // }

  render() {
    const status = 'Next player: X';
    return (
      <div>
        
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

export default App;
