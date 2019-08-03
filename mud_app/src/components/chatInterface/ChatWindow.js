import React from "react";
import styled from "styled-components";
import { Jumbotron, Form } from "react-bootstrap";

export default function ChatWindow(props) {
  let [input, setInput] = React.useState("");

  let submitChat = ev => {
    ev.preventDefault();
    props.say(input);
    setInput("");
  };

  const handleChange = set => ev => {
    set(ev.target.value);
  };

  function convertChatType(type) {
    switch (type) {
      case "env":
        return "green";
      case "err":
        return "red";
      case "item":
        return "yellow";
      default:
        return "black";
    }
  }

  return (
    <ChatBox>
      <Jumbotron>
        <div className="text-log-area">
          {props.chatLines.map(line => (
            <div key={line.id}>
              <StyledChatLine color={convertChatType(line.type)}>
                {line.time.getHours()}:{line.time.getMinutes()}:
                {line.time.getSeconds()} - {line.text}
              </StyledChatLine>
              <hr />
            </div>
          ))}
        </div>
        <Form onSubmit={submitChat}>
          <Form.Control
            name="chatInput"
            placeholder="enter text here..."
            value={input}
            onChange={handleChange(setInput)}
          />
        </Form>
      </Jumbotron>
    </ChatBox>
  );
}
const ChatBox = styled.div`
  max-width: 700px;

  .jumbotron {
    height: 300px;
    margin-bottom: 0;
    padding: 10px;
  }

  .text-log-area {
    border: 1px solid lightgray;
    border-radius: 5px;
    width: 100%;
    height: 245px;
    text-align: left;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
  }

  hr {
    margin: 0;
  }
`;

const StyledChatLine = styled.p`
  margin: 0;
  color: ${props => props.color};
`;
