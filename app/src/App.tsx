import { useState } from "react";
import "./App.css";

type Props = {
  value: string;
  onSquareClick: any;
};
type BoardProps = {
  xIsNext: boolean;
  squares: string[];
  onPlay: any;
};

// DRY
const Square = (props: Props) => {
  return (
    <button className="square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
};

const Board = (props: BoardProps) => {
  // ボタンが押された時の処理
  // TODO : 初手は真ん中のマスに置けないようにする

  const handleClick = (squareNumber: number) => {
    if (props.squares[squareNumber] || calculateWinner(props.squares)) {
      return;
    }
    let nextSquares = props.squares.slice();
    //入力値反転
    if (props.xIsNext) {
      nextSquares[squareNumber] = "X";
    } else {
      nextSquares[squareNumber] = "O";
    }
    props.onPlay(nextSquares);
  };

  const winner = calculateWinner(props.squares);
  let status;
  if (typeof winner === 'string') {
    status = "Winner is " + winner + " !";
  }
  else if(typeof winner === 'boolean'){
    status = (props.xIsNext ? "O":"X") + " is Reached !";
  }
  else {
    status = "Next player is " + (props.xIsNext ? "X" : "O");
  }
  //return{}内部をindex.tsxに渡す
  return (
    //複数のJSX要素は<> </>で囲む必要がある
    // Do props
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={props.squares[0]}
          onSquareClick={() => {
            handleClick(0);
          }}
        />
        <Square
          value={props.squares[1]}
          onSquareClick={() => {
            handleClick(1);
          }}
        />
        <Square
          value={props.squares[2]}
          onSquareClick={() => {
            handleClick(2);
          }}
        />
      </div>
      <div className="board-row">
        <Square
          value={props.squares[3]}
          onSquareClick={() => {
            handleClick(3);
          }}
        />
        <Square
          value={props.squares[4]}
          onSquareClick={() => {
            handleClick(4);
          }}
        />
        <Square
          value={props.squares[5]}
          onSquareClick={() => {
            handleClick(5);
          }}
        />
      </div>
      <div className="board-row">
        <Square
          value={props.squares[6]}
          onSquareClick={() => {
            handleClick(6);
          }}
        />
        <Square
          value={props.squares[7]}
          onSquareClick={() => {
            handleClick(7);
          }}
        />
        <Square
          value={props.squares[8]}
          onSquareClick={() => {
            handleClick(8);
          }}
        />
      </div>
    </>
  );
};

// 勝者を判定する処理
const calculateWinner = (squares: string[]) => {
  const winLines = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winLines.length; i++) {
    const [first, second, third] = winLines[i];
    // TODO 置いたら勝ちになるマスの背景を赤くする

    if (
      squares[first] &&
      squares[first] === squares[second] &&
      squares[second] === squares[third]
    ) {

      return squares[first];
    }

    else if(
      (
      (squares[first] && !squares[second]&&  squares[third] && squares[first] === squares[third])||
      (squares[second] && !squares[first]&&  squares[third] && squares[second] === squares[third])||
      (squares[first] && !squares[third]&&  squares[second] && squares[first] === squares[second]))

    ){
      return false;
    }
  }

  return null;
};

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: any) => {
    // historyの要素の後にnextSquaresを繋げた配列を作成
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: any) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Game Reset";
    }
    return (
      <li key={move}>
        <button className="history" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul>{moves}</ul>
      </div>
    </div>
  );
}
