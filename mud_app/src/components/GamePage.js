import React from "react";
import Login_HOC from "./Login_HOC";
import Button from "react-bootstrap/Button";
function GamePage(props) {
  return (
    <>
      <h1>This is the Game Page...</h1>
      <h2>The Game is a LIE...</h2>
      <Button onClick={props.logOut}>Log Out</Button>
    </>
  );
}

export default Login_HOC(GamePage);
