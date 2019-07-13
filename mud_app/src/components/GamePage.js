import React from "react";
import Pusher from "pusher-js";
import Login_HOC from "./Login_HOC";
import { Jumbotron, Button } from "react-bootstrap";
import PlayerList from "./chatInterface/PlayerList";
import MovementController from "./movement/MovementController";
import ChatWindow from "./chatInterface/ChatWindow";

Pusher.logToConsole = true;

const pusher = new Pusher("8e7cc001ce024615bdf7", {
  cluster: "us2",
  forceTLS: true
});

const channel = pusher.subscribe("say-channel");

class GamePage extends React.Component {
  state = {
    chatLines: [],
    roomInfo: { players: [] }
  };

  componentDidMount() {
    this.initGame();
  }

  initGame = async () => {
    let responseRaw = await fetch("http://localhost:8000/api/adv/init/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.getItem("token")}`
      }
    });
    let response = await responseRaw.json();
    this.setState({ roomInfo: response });
    this.createRoomEntryText(response);
  };

  move = async dir => {
    let responseRaw = await fetch("http://localhost:8000/api/adv/move/", {
      method: "post",
      body: JSON.stringify({ direction: dir }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.getItem("token")}`
      }
    });
    let response = await responseRaw.json();
    this.setState({ roomInfo: response });
    this.createRoomEntryText(response);
  };

  say = phrase => {
    fetch("http://localhost:8000/api/adv/say/", {
      method: "post",
      body: JSON.stringify({ message: phrase }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.getItem("token")}`
      }
    });
  };

  createRoomEntryText = room => {
    let d = new Date();
    this.setState({
      chatLines: [
        { text: room.description, type: "env", time: d, id: d.getTime() + 1 },
        {
          text: `You have entered:  ${room.title}`,
          type: "env",
          time: d,
          id: d.getTime()
        },
        ...this.state.chatLines
      ]
    });
    // subscribe to new room event channel
    channel.bind(room.title, this.createSayText);
  };

  createSayText = data => {
    let d = new Date();
    this.setState({
      chatLines: [
        {
          text: `${data.player} says "${data.message}"`,
          type: "say",
          time: d,
          id: d.getTime()
        },
        ...this.state.chatLines
      ]
    });
  };

  render() {
    return (
      <>
        <Button onClick={this.props.logOut}>Log Out</Button>
        <Jumbotron>
          <h1>{this.state.roomInfo.title}</h1>
          <h2>{this.state.roomInfo.description}</h2>
        </Jumbotron>
        <PlayerList players={this.state.roomInfo.players} />
        <ChatWindow chatLines={this.state.chatLines} say={this.say} />
        <MovementController
          move={this.move}
          error={this.state.roomInfo.error_msg}
        />
      </>
    );
  }
}

export default Login_HOC(GamePage);
