"use strict";

// require('dotenv-safe').load();
const http = require("http");
const express = require("express");
const { urlencoded } = require("body-parser");
const twilio = require("twilio");
const ClientCapability = twilio.jwt.ClientCapability;
const VoiceResponse = twilio.twiml.VoiceResponse;

let app = express();
app.use(express.static(__dirname + "/public"));
app.use(urlencoded({ extended: false }));

// Generate a Twilio Client capability token
app.get("/token", (request, response) => {
  const capability = new ClientCapability({
    accountSid: `AC7b1a14ab62b5efd258703ab6abfdc1f1`,
    authToken: `9f915aeaefae92d6696874d861001fe5`,
  });

  capability.addScope(
    new ClientCapability.OutgoingClientScope({
      applicationSid: "AP16cedc2021692d1e26f51f40ea826239",
    })
  );

  const token = capability.toJwt();

  // Include token in a JSON response
  response.send({
    token: token,
  });
});

// Create TwiML for outbound calls
app.post("/voice", (request, response) => {
  console.log("ran");
  let voiceResponse = new VoiceResponse();
  voiceResponse.dial(
    {
      callerId: +12542796052,
    },
    request.body.number
  );
  response.type("text/xml");
  response.send(voiceResponse.toString());
});

app.use((error, req, res, next) => {
  res.status(500);
  res.send("Server Error");
  console.error(error.stack);
  next(error);
});

let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Express Server listening on *:${port}`);
});

module.exports = app;
