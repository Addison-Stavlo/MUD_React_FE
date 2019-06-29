import React from "react";
import Login_HOC from "./Login_HOC";
import { Jumbotron } from "react-bootstrap";
import PlayerList from "./chatInterface/PlayerList";
import MovementController from "./movement/MovementController";
import ChatWindow from "./chatInterface/ChatWindow";

function GamePage(props) {
  const [roomInfo, setRoomInfo] = React.useState({ players: [] });
  const [chatLines, setChatLines] = React.useState([]);

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
    createRoomEntryText(response);
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
    createRoomEntryText(response);
  }

  function createRoomEntryText(response) {
    let d = new Date();
    setChatLines([
      ...chatLines,
      {
        text: `You have entered:  ${response.title}`,
        type: "env",
        time: d,
        id: d.getTime()
      },
      { text: response.description, type: "env", time: d, id: d.getTime() + 1 }
    ]);
  }

  return (
    <>
      <Jumbotron>
        <h1>{roomInfo.title}</h1>
        <h2>{roomInfo.description}</h2>
      </Jumbotron>
      <PlayerList players={roomInfo.players} />
      <ChatWindow chatLines={chatLines} />
      <MovementController move={move} error={roomInfo.error_msg} />
    </>
  );
}

export default Login_HOC(GamePage);
