import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import styled from "styled-components";

export default function PlayerList(props) {
  // only for testing style on overflowing room population
  //   let players = [];
  //   for (let i = 0; i < 20; i++) {
  //     players.push(`player${i}`);
  //   }

  return (
    <PlayersList>
      <h3>Players in Room: </h3>
      <ListGroup>
        {props.players.map(player => (
          <ListGroup.Item key={player}>{player}</ListGroup.Item>
        ))}
      </ListGroup>
    </PlayersList>
  );
}

const PlayersList = styled.div`
  width: 300px;
  min-height: 300px;
  max-height: 600px;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 lightgray;

  .list-group {
    max-height: 550px;
    height: inherit;
    overflow-y: auto;
    margin: 10px;
  }
`;
