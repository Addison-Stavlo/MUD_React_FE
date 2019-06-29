import React from "react";
import styled from "styled-components";
import { Jumbotron, Form } from "react-bootstrap";

export default function ChatWindow(props) {
  const chatLines = new Array(20);
  for (let i = 0; i < 20; i++) {
    chatLines[i] = `This is test chat line #${i} - cool beans!`;
  }

  let endLog;

  const scrollDown = () => {
    endLog.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollDown();
  }, [chatLines]);

  return (
    <ChatBox>
      <Jumbotron>
        <div className="text-log-area">
          {chatLines.map(line => (
            <>
              <p key={line}>{line}</p>
              <hr />
            </>
          ))}
          <div
            ref={el => {
              endLog = el;
            }}
          />
        </div>
        <Form>
          <Form.Control name="chat-input" placeholder="enter text here..." />
        </Form>
        <button onClick={scrollDown}>Scroll</button>
      </Jumbotron>
    </ChatBox>
  );
}

const ChatBox = styled.div`
  max-width: 700px;
  border: 1px solid black;

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

  hr,
  p {
    margin: 0;
  }
`;
