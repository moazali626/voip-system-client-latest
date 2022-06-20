import React from "react";
import { Container, Step } from "semantic-ui-react";
// import "semantic-ui-css/semantic.min.css";
import CallProgressCSS from "./CallProgress.module.scss";
import socket from "../../../utils/SocketIo";

const CallProgress = ({ call }) => {
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
              // style={{ display: "inline" }}
            />
            <Step
              icon="cogs"
              title="Pick Up"
              //   description="User waiting in queue"
              active={call.CallStatus === "enqueue"}
              disabled={call.CallStatus === "ringing"}
              // style={{ display: "inline" }}
              onClick={() => answerCall(call.CallSid)}
            />
            {/* <Step
              icon="headphones"
              title="Answered"
              description="Answered by Admin"
              disabled={
                call.CallStatus === "ringing" || call.CallStatus === "enqueue"
              }
            /> */}
            <Step
              icon="times"
              title="Hang up"
              // description="End the call"
              // style={{ display: "inline" }}
              onClick={() => window.location.reload()}
            />
          </Step.Group>
        </Container>
      }
    </div>
  );
};

export default CallProgress;
