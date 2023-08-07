//node_modules内のディレクトリからimportしている
import React from "react";
//Webブラウザとやりとりするライブラリ
import ReactDOM from "react-dom/client";
import "./index.css";
import Board from "./App";

// Compose App component here
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>
);


