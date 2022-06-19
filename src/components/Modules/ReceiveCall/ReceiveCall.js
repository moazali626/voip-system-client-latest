import React, { useEffect, useState } from "react";
import socket from "../../../utils/SocketIo";
import { DraftsTwoTone } from "@mui/icons-material";
import ReceiveCallCSS from "./ReceiveCall.module.scss";
import * as Twilio from "twilio-client";
import { useImmer } from "use-immer";
import CallProgress from "../../UI/CallProgress/CallProgress";

const ReceiveCall = () => {
  const [calls, setCalls] = useImmer({
    calls: [],
  });

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
    socket.on("call-new", ({ data: { CallSid, CallStatus, From } }) => {
      setCalls((draft) => {
        draft.calls.push({ CallSid, CallStatus, From });
      });
    });
    // socket.on("call-status-changed", (data) => {
    //   console.log(data.data.status);
    //   setCall(data.data.status);
    // });
    socket.on("twilio-token", (data) => {
      console.log("Received Token from the backend");
      console.log(data.token);
      setTwilioToken(data.token);
    });
    socket.on("enqueue", ({ data: { CallSid } }) => {
      setCalls((draft) => {
        const index = draft.calls.findIndex(
          ({ CallSid }) => CallSid === CallSid
        );
        draft.calls[index].CallStatus = "enqueue";
      });
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

  // const answerCall = (sid) => {
  //   socket.emit("answer-call", { sid });
  // };

  return (
    <div>
      {calls.calls.map((call) => (
        <CallProgress call={call} />
      ))}
    </div>
  );
};

export default ReceiveCall;
