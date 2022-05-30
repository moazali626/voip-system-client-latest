import React, { useEffect, useState } from "react";
import SmsIcon from "@mui/icons-material/Sms";
import axios from "axios";

const userId = localStorage.getItem("id");

const SmsAlert = () => {
  useEffect(() => {
    const checkMessage = async () => {
      let result = await axios.get("http://localhost:4000/get-messages", {
        headers: {
          id: userId,
        },
      });
    };
    checkMessage();
    // const interval = setInterval(() => {
    //   checkMessage();
    // }, 3000);
    // console.log("USE-EFFECT RAN");
    // return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <SmsIcon
        style={{
          color: "blue",
          fontSize: "3rem",
          position: "absolute",
          left: "80%",
          bottom: "91%",
        }}
      />
    </div>
  );
};

export default SmsAlert;
