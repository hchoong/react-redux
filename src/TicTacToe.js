import React from 'react';
import './ttt.css';

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick} style={{color: props.highlight?'red':'black'}}>
      {props.value}
    </button>
  );
}

const calculateWinner = (squares) => {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  let win_indx = null;
  const winner = lines.some(([a,b,c], index) => {
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
      win_indx = index;
      return true;
    }
    return false;
  });
  if (winner) {
    return lines[win_indx];
  }
  return null;
}

const Board = ({size, squares, winner, onClick=()=>{}, ...props}) => {
  let rows = [];
  const sqrt = Math.floor(Math.sqrt(size));
  for (let i=0; i<sqrt; i++) {
    let cols = [];
    for (let j=0; j<sqrt; j++) {
      let v = i*sqrt+j;
      cols.push(<Square
        value={squares[v]}
        onClick={() => onClick(v)}
        key={v}
        highlight={winner && winner.indexOf(v)>=0}
      />);
    }
    rows.push(<div className="board-row" key={i}>{cols}</div>);
  }
  return <div>{rows}</div>;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.len = 9;
    this.state = {
      history: [{
        squares: Array(this.len).fill(null),
        coord: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const ele = this.state.xIsNext?'X':'O';
    squares[i] = ele;
    this.setState({
      history: history.concat([{
        squares: squares,
        coord: ele + '(' + i + ')',
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        ('Go to move #' + move + ': ' + step.coord) :
        'Go to game start'
      ;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
          {move!==0 && this.state.stepNumber===move && <b>&lt;&lt;</b>}
        </li>
      );
    });

    let status = winner ?
      'Winner: ' + (this.state.xIsNext?'O':'X') :
      'Next player: ' + (this.state.xIsNext?'X':'O')
    ;
    if (this.state.stepNumber===this.len) {
      status = 'Tie Game';
    }

    return (
      <div className="game">
        <Board className="game-board"
          size={this.len}
          squares={current.squares}
          winner={winner}
          onClick={(i) => this.handleClick(i)}
        />
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


export default Game;
