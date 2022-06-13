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
      console.log(data.token);
      setTwilioToken(data.token);
    });
    socket.on("enqueue", (data) => {
      let result = data;
      console.log("enqueue socket data", result.data);
      const CallSid = result.data.CallSid;
      const CallStatus = "enqueue";
      const Called = result.data.Called;
      const Caller = result.data.Caller;
      const From = result.data.From;
      const To = result.data.To;

      let updatedData = {
        CallSid: CallSid,
        CallStatus: CallStatus,
        Called: Called,
        Caller: Caller,
        From: From,
        To: To,
      };

      setCall(updatedData);
      // setCall((data) => {
      //   const index = data.findIndex(({ callSid }) => callSid === data.callSid);
      //   data[index].data.CallStatus = "enqueue";
      // });
      // setCall((data) => {
      //   // 3
      //   // const index = data.findIndex(({ callSid }) => callSid === data.callSid);
      //   console.log(data.data.CallStatus);
      //   data.data.CallStatus = "enqueue";
      //   console.log(data.data.CallStatus);
      // });
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

  const answerCall = (sid) => {
    socket.emit("answer-call", { sid });
  };

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
                active={call.CallStatus === "enqueue"}
                disabled={call.CallStatus === "ringing"}
                style={{ display: "inline" }}
                onClick={() => answerCall(call.CallSid)}
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
