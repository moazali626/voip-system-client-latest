import React, { useEffect, useState } from "react";
import CallMenuCSS from "./CallMenu.module.scss";
// import socket from "../../../utils/SocketIo";
import { Container, Step } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const CallMenu = () => {
  useEffect(() => {
    console.log("useEffect of CallMenu ran");
    socket.on("disconnect", () => {
      console.log("Socked disconnected");
    });
    return () => {};
  }, []);
  return (
    <div className={CallMenuCSS.container}>
      <Container className={CallMenuCSS.wrapper}>
        <Step.Group fluid>
          <Step
            icon="phone"
            title="Ringing"
            description="+1 555-5555"
            completed
          />
          <Step
            icon="cogs"
            title="In queue"
            description="User waiting in queue"
            active
            style={{ display: "inline" }}
          />
          <Step
            icon="headphones"
            title="Answered"
            description="Answered by John"
            disabled
          />
          <Step icon="times" title="Hang up" description="Missed call" />
        </Step.Group>
      </Container>
    </div>
  );
};

export default CallMenu;
