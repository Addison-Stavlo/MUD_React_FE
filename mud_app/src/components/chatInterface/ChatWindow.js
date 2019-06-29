import React from "react";
import styled from "styled-components";
import { Jumbotron, Form } from "react-bootstrap";

export default function ChatWindow(props) {
  const chatLines = new Array(20);
  for (let i = 0; i < 20; i++) {
    chatLines[i] = `This is test chat line #${i} - cool beans!`;
  }

  React.useEffect(() => {
    scrollDown();
  }, [props.chatLines]);

  let endLog;
  const scrollDown = () => {
    endLog.scrollIntoView({ behavior: "smooth" });
  };

  const submitChat = ev => {
    ev.preventDefault();
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
    }

    hr {
      margin: 0;
    }
  `;

  const StyledChatLine = styled.p`
    margin: 0;
    color: ${props => props.color};
  `;

  return (
    <ChatBox>
      <Jumbotron>
        <div className="text-log-area">
          {props.chatLines.map(line => (
            <>
              <StyledChatLine key={line.id} color={convertChatType(line.type)}>
                {line.time.getHours()}:{line.time.getMinutes()}:
                {line.time.getSeconds()} - {line.text}
              </StyledChatLine>
              <hr />
            </>
          ))}
          <div
            ref={el => {
              endLog = el;
            }}
          />
        </div>
        <Form onSubmit={submitChat}>
          <Form.Control name="chat-input" placeholder="enter text here..." />
        </Form>
      </Jumbotron>
    </ChatBox>
  );
}
