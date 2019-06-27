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
          <ListGroup.Item>{player}</ListGroup.Item>
        ))}
      </ListGroup>
    </PlayersList>
  );
}

const PlayersList = styled.div`
  /* display: flex;
    flex-direction: column; */
  width: 300px;
  min-height: 300px;
  max-height: 600px;
  /* border: 1px solid lightgray; */
  border-radius: 5px;
  box-shadow: 0 0 10px 0 lightgray;

  .list-group {
    max-height: 550px;
    height: inherit;
    overflow-y: auto;
    margin: 10px;
  }
`;
