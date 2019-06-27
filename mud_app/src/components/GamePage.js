import React from "react";
import Login_HOC from "./Login_HOC";
import Button from "react-bootstrap/Button";
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
    console.log(responseRaw);
    console.log(response);
    setRoomInfo(response);
  };

  return (
    <>
      <h1>Room: {roomInfo.title}</h1>
      <h2>{roomInfo.description}</h2>
      <h3>Players in Room: {roomInfo.players.map(player => player)}</h3>
      <Button onClick={initGame}>Init Game</Button>
    </>
  );
}

export default Login_HOC(GamePage);
