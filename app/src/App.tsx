import React from "react";
import { useState } from "react";
import "./App.css";

type Props = {
  value: string;
  onSquareClick: any;
};

// DRY
const Square = (props: Props) => {
  return (
    <button className="square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
};

const Board = () => {
  // 初期化
  const [xIsNext, setxIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(""));

  // ボタンが押された時の処理
  const handleClick = (squareNumber: number) => {
    if(squares[squareNumber] || calculateWinner(squares)) {
      return;
    }
    let nextSquares = squares.slice();
      //入力値反転
    if(xIsNext) {
      nextSquares[squareNumber] = "X";
    }
    else {
      nextSquares[squareNumber] = "O";
    }

    setxIsNext(!xIsNext);
    setSquares(nextSquares);
  };

  // 盤面をリセットする処理
  const resetSquares = () => {
    let nullSquares = squares.slice();
    nullSquares.fill("");
    setxIsNext(true);
    setSquares(nullSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if(winner) {
    status = "Winner is " + winner + " !";
  }
  else {
    status = "Next player is " + (xIsNext ? "X" : "O");
  }
  //return{}内部をindex.tsxに渡す
  return (
    //複数のJSX要素は<> </>で囲む必要がある
    // Do props
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => {handleClick(0)}} />
        <Square value={squares[1]} onSquareClick={() => {handleClick(1)}} />
        <Square value={squares[2]} onSquareClick={() => {handleClick(2)}} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => {handleClick(3)}} />
        <Square value={squares[4]} onSquareClick={() => {handleClick(4)}} />
        <Square value={squares[5]} onSquareClick={() => {handleClick(5)}} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => {handleClick(6)}} />
        <Square value={squares[7]} onSquareClick={() => {handleClick(7)}} />
        <Square value={squares[8]} onSquareClick={() => {handleClick(8)}} />
      </div>
      <button className="Reset" onClick={resetSquares}>
        Reset
      </button>

      <div className="history">
        <History />
      </div>
    </>
  );
};

// 勝者を判定する処理
const calculateWinner = (squares:string[]) => {
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
    [2, 4, 6]
  ];
  for(let i=0; i< winLines.length; i++) {
    const [first, second, third] = winLines[i];
    if(squares[first] &&
       squares[first] === squares[second] &&
       squares[second] === squares[third]){
        return squares[first];
      }
  };
  return null;
};

// 対局後の振り返り
const History = () => {
  const [count ,setCount] = useState(1);
  const saveHistory = () => {
    // countを増やす
    setCount(count+1);
  };

  // Historyを返す
  return (
    <button className="history">
      go back # + {count}
    </button>
  );
}

export default Board;

