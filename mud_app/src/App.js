import React from "react";
import logo from "./logo.svg";
import "./App.css";
import GamePage from "./components/GamePage";
function App() {
  return (
    <div className="App">
      <h1>The Most Awesome MUD!</h1>
      <GamePage />
    </div>
  );
}

export default App;
