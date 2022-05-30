import React, { useEffect, useState } from "react";
import socket from "../../../utils/SocketIo";
import { Container, Step } from "semantic-ui-react";
import { DraftsTwoTone } from "@mui/icons-material";
import ReceiveCallCSS from "./ReceiveCall.module.scss";
import * as Twilio from "twilio-client";

const ReceiveCall = () => {
  const [call, setCall] = useState();
  const [twilioToken, setTwilioToken] = useState();

  useEffect(() => {
    console.log("Twilio Token Changed");
    if (twilioToken) {
      connectTwilioVoiceClient(twilioToken);
    }
  }, [twilioToken]);

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("Socked disconnected");
    });
    socket.on("call-new", (data) => {
      console.log(data.data);
      setCall(data.data);
      //
    });
    socket.on("call-status-changed", (data) => {
      console.log(data.data.status);
      setCall(data.data.status);
    });
    socket.on("twilioToken", (data) => {
      console.log("Received Token from the backend");
      setTwilioToken(data.token);
    });
    return () => {};
  }, []);

  function connectTwilioVoiceClient(twilioToken) {
    const device = new Twilio.Device(twilioToken, { debug: true });
    device.on("error", (error) => {
      console.error(error);
    });
    device.on("incoming", (connection) => {
      console.log("Incoming from twilio");
      connection.accept();
    });
  }
  return (
    <div>
      <div className={ReceiveCallCSS.container}>
        {call && (
          <Container
            style={{ width: "620px", marginBottom: "110rem" }}
            className={ReceiveCallCSS.container}
          >
            <Step.Group fluid>
              <Step
                icon="phone"
                title="Ringing"
                description={call.From}
                active={call.CallStatus === "ringing"}
                completed={call.CallStatus !== "ringing"}
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
                disabled={call.CallStatus === "ringing"}
              />
              <Step icon="times" title="Hang up" description="Missed call" />
            </Step.Group>
          </Container>
        )}
      </div>
    </div>
  );
};

export default ReceiveCall;
