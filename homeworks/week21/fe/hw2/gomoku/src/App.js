import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Board extends React.Component {

  componentDidMount() {
    this.draw();
  }

  draw() {
    const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const en = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];
    const canvas = ReactDOM.findDOMNode(this);
    const ctx = canvas.getContext('2d');
    const grid = 30;
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    for (let i = 0; i < 19; i++) {
      ctx.fillText(num[i], 25 + i * grid, 20);
      ctx.fillText(num[i], 25 + i * grid, 590);
    }
    for (let i = 0; i < 19; i++) {
      ctx.fillText(en[i], 10, 35 + i * grid);
      ctx.fillText(en[i], 580, 35 + i * grid);
    }

    ctx.beginPath();
    for (let i = 30; i < 20 * grid; i += grid) {
      ctx.moveTo(i, 30);
      ctx.lineTo(i, 570);
      ctx.stroke();
    }
    for (let i = 30; i < 20 * grid; i += grid) {
      ctx.moveTo(30, i);
      ctx.lineTo(570, i);
      ctx.stroke();
    }
    for (let i = 4; i <= 16; i += 6) {
      for (let j = 4; j <= 16; j += 6) {
        ctx.beginPath();
        ctx.arc(i * grid, j * grid, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
      }
    }
  };

  render() {
    return (
      <canvas
        id='board'
        height='600'
        width='600'
      />
    );
  }
}

class Chess extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chessLogs: [],
      winner: '',
    }
    this.chessCanvas = React.createRef();
    this.checkChess = this.checkChess.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const { chessLogs } = this.state;
    const canvas = ReactDOM.findDOMNode(this.refs.chessCanvas);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 600, 600);
    const grid = 30;
    chessLogs.map((log, index) => {
      ctx.beginPath();
      ctx.arc(log.x * grid, log.y * grid, grid / 2 * 0.8, 0, 2 * Math.PI);
      let crg = ctx.createRadialGradient(log.x * 30, log.y * 30, 13, log.x * 30, log.y * 30, 0);
      if (index % 2 === 0) {
        crg.addColorStop(0, '#0A0A0A');
        crg.addColorStop(1, '#636766')
      } else {
        crg.addColorStop(0, '#D1D1D1');
        crg.addColorStop(1, '#F9F9F9');
      }
      ctx.fillStyle = crg;
      ctx.fill();
    });
  };

  checkChess(e) {
    const { chessLogs, winner } = this.state;
    if (winner !== '') { return }
    if (this.checkWin(chessLogs) !== '') {
      this.setState({
        winner: this.checkWin(chessLogs),
      })
      return;
    }
    const xAxis = e.nativeEvent.offsetX;
    const yAxis = e.nativeEvent.offsetY;
    // 越界
    if (xAxis < 20 || xAxis > 580 || yAxis < 20 || yAxis > 580) {
      return;
    }
    const x = Math.round(xAxis / 30)
    const y = Math.round(yAxis / 30)
    // 同位
    if (chessLogs.find(log => log.x === x && log.y === y)) {
      return;
    }
    const chess = [...chessLogs, { x, y }];
    this.setState({
      chessLogs: chess,
    })
  }

  checkWin(logs) {
    if (logs.length < 8) {
      return '';
    }
    let squares = Array(19).fill(null).map(() => Array(19).fill(null));
    logs.map((log, index) => {
      squares[log.x - 1][log.y - 1] = (index % 2 === 0 ? 'B' : 'W')
    });
    const last = logs.length % 2 === 0 ? 'White' : 'Black';
    const x = logs[logs.length - 1].x;
    const y = logs[logs.length - 1].y;
    let sum = 1;
    let a = x;
    let b = y;
    function check() {
      if (sum < 5) {
        sum = 1;
        a = x;
        b = y;
        return false;
      } else {
        return true;
      }
    }
    // 右
    if (a < 19) {
      while (squares[a - 1][b - 1] === squares[a][b - 1]) {
        sum++;
        a++;;
      }
      a = x;
    }
    // 左
    while (squares[a - 1][b - 1] === squares[a - 2][b - 1]) {
      sum++;
      a--;
    }
    if (check()) {
      return last;
    }
    // 上
    while (squares[a - 1][b - 1] === squares[a - 1][b]) {
      sum++;
      b++;
    }
    b = y;
    // 下
    while (squares[a - 1][b - 1] === squares[a - 1][b - 2]) {
      sum++;
      b--;
    }
    if (check()) {
      return last;
    }
    // 右上
    if (a < 19 && b > 1) {
      while (squares[a - 1][b - 1] === squares[a][b]) {
        sum++;
        a++;
        b++;
      }
      a = x;
      b = y;
    }
    // 左下
    while (squares[a - 1][b - 1] === squares[a - 2][b - 2]) {
      sum++;
      a--;
      b--;
    }
    if (check()) {
      return last;
    }
    // 左上
    while (squares[a - 1][b - 1] === squares[a - 2][b]) {
      sum++;
      a--;
      b++;
    }
    a = x;
    b = y;
    // 右下
    while (squares[a - 1][b - 1] === squares[a][b - 2]) {
      sum++;
      a++;
      b--;
    }
    if (check()) {
      return last;
    }
    return '';
  }

  handleMove(step) {
    const { chessLogs, winner } = this.state;
    if (winner !== '') {
      this.setState({
        chessLogs: chessLogs.filter((_, i) => i < step),
        winner: '',
      })
    } else {
      this.setState({
        chessLogs: chessLogs.filter((_, i) => i < step),
      })
    }
  }

  render() {
    const { chessLogs } = this.state;
    const en = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];
    const winner = this.checkWin(chessLogs);
    return (
      <div>
        <canvas
          ref='chessCanvas'
          id='chess'
          height='600'
          width='600'
          onClick={this.checkChess}
        />
        <div className='control'>
          <div className='button__group'>
            <div className='button__group info'>
              {winner !== '' ?
                `Winner: ${winner}` : (`Next: ${(chessLogs.length % 2 === 0) ? 'Black' : 'White'}`)
              }
            </div>
            <div className='history'>
              <div className='history__btn restart' onClick={() => this.handleMove(0)} >#0 Start</div>
              {chessLogs.map((log, index) => (
                <div className='history__btn' key={index + 1} onClick={() => this.handleMove(index + 1)}>#{index + 1}  {log.x}, {en[log.y - 1]}</div>
              ))}
            </div>
          </div>
          <div className='tip'>點選退回步數</div>
        </div>
      </div >
    );
  }
}

class App extends Component {

  render() {
    return (
      <div className='wrapper'>
        <Board />
        <Chess />
      </div >
    );
  }
}

export default App;
