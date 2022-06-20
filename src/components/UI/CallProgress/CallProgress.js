import React, { useState } from "react";
import { Container, Step } from "semantic-ui-react";
// import "semantic-ui-css/semantic.min.css";
import CallProgressCSS from "./CallProgress.module.scss";
import socket from "../../../utils/SocketIo";
import Button from "@material-ui/core/Button";

const CallProgress = ({ call }) => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonHandler = () => {
    console.log("button was pressed");
    setIsPressed(true);
  };

  function answerCall(sid) {
    socket.emit("answer-call", { sid });
  }
  return (
    <div className={CallProgressCSS.container}>
      {
        <Container
          style={{ width: "620px", marginBottom: "110rem" }}
          className={CallProgressCSS.container}
        >
          <Step.Group fluid>
            <Step
              icon="phone"
              title="Ringing"
              description={call.From}
              active={call.CallStatus === "ringing"}
              completed={call.CallStatus != "ringing"}
              style={{ marginBottom: "0.5rem" }}
            />
            {/* <Step
              icon="cogs"
              title="Pick Up"
              //   description="User waiting in queue"
              active={call.CallStatus === "enqueue"}
              disabled={call.CallStatus === "ringing"}
              // style={{ display: "inline" }}
              onClick={() => answerCall(call.CallSid)}
            /> */}
            <Button
              variant="outlined"
              color="primary"
              active={call.CallStatus === "enqueue"}
              disabled={call.CallStatus === "ringing"}
              // onClick={() => answerCall(call.CallSid)}
              onClick={() => {
                answerCall(call.CallSid), buttonHandler();
              }}
            >
              Pick Up
            </Button>

            {/* <Step
              icon="headphones"
              title="Answered"
              description="Answered by Admin"
              disabled={
                call.CallStatus === "ringing" || call.CallStatus === "enqueue"
              }
            /> */}
            {/* <Step
              icon="times"
              title="Hang up"
              // description="End the call"
              // style={{ display: "inline" }}
              onClick={() => window.location.reload()}
            /> */}
            <Button
              variant="outlined"
              icon="times"
              title="Hang up"
              color="secondary"
              style={{ marginLeft: "1rem" }}
              // description="End the call"
              // style={{ display: "inline" }}
              disabled={isPressed == false}
              onClick={() => window.location.reload()}
            >
              Hang Up
            </Button>
          </Step.Group>
        </Container>
      }
    </div>
  );
};

export default CallProgress;
