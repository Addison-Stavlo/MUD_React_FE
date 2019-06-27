import React from "react";
import styled from "styled-components";
import { Alert, Button } from "react-bootstrap";

export default function MovementController(props) {
  return (
    <ControllerBox>
      <div className="button-holder">
        <h3>Move</h3>
        <Button className="n-btn" onClick={() => props.move("n")}>
          North
        </Button>
        <div className="button-e-w-group">
          <Button className="w-btn" onClick={() => props.move("w")}>
            West
          </Button>
          <Button className="e-btn" onClick={() => props.move("e")}>
            East
          </Button>
        </div>
        <Button className="s-btn" onClick={() => props.move("s")}>
          South
        </Button>
      </div>

      {props.error ? <Alert variant={"danger"}>{props.error}</Alert> : null}
    </ControllerBox>
  );
}

const ControllerBox = styled.div`
  margin: 0 auto;
  max-width: 250px;

  .button-holder {
    box-shadow: 0 0 10px 0 lightgray;
    padding: 20px;
    border-radius: 5px;

    h3 {
      margin-top: 0px;
    }

    button {
      margin: 5px 20px;
    }
  }
`;
