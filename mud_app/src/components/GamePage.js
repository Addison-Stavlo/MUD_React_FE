import React from "react";
import Login_HOC from "./Login_HOC";
import { Alert, Button, Jumbotron, ListGroup } from "react-bootstrap";
import PlayerList from "./chatInterface/PlayerList";

function GamePage(props) {
  const [roomInfo, setRoomInfo] = React.useState({ players: [] });

  React.useEffect(() => {
    initGame();
  }, []);

  const initGame = async () => {
    let responseRaw = await fetch("http://localhost:8000/api/adv/init/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.getItem("token")}`
      }
    });
    let response = await responseRaw.json();
    setRoomInfo(response);
  };

  async function move(dir) {
    let responseRaw = await fetch("http://localhost:8000/api/adv/move/", {
      method: "post",
      body: JSON.stringify({ direction: dir }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.getItem("token")}`
      }
    });
    let response = await responseRaw.json();
    console.log(response);
    setRoomInfo(response);
  }

  return (
    <>
      <Jumbotron>
        <h1>{roomInfo.title}</h1>
        <h2>{roomInfo.description}</h2>
      </Jumbotron>
      <PlayerList players={roomInfo.players} />
      {roomInfo.error_msg ? (
        <Alert variant={"danger"}>{roomInfo.error_msg}</Alert>
      ) : null}
      <Button onClick={() => move("n")}>Move N</Button>
      <Button onClick={() => move("s")}>Move S</Button>
      <Button onClick={() => move("e")}>Move E</Button>
      <Button onClick={() => move("w")}>Move W</Button>
    </>
  );
}

export default Login_HOC(GamePage);
