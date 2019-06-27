import React from "react";
import styled from "styled-components";
import { Alert, Button } from "react-bootstrap";

export default function MovementController(props) {
  return (
    <ControllerBox>
      <Button onClick={() => props.move("n")}>North</Button>
      <Button onClick={() => props.move("s")}>South</Button>
      <Button onClick={() => props.move("e")}>East</Button>
      <Button onClick={() => props.move("w")}>West</Button>

      {props.error ? <Alert variant={"danger"}>{props.error}</Alert> : null}
    </ControllerBox>
  );
}

const ControllerBox = styled.div``;
