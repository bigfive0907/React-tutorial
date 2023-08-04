import React from "react";
import "./App.css";

function Board() {
  //return{}内部をindex.tsxに渡す
  return (
    //複数のJSX要素は<> </>で囲む必要がある
    // Do props 
    <>
      <div className="board-row">
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div>
      <div className="board-row">
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div>
      <div className="board-row">
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </>
  );
}

export default Board;
