import React, { useEffect, useState } from "react";
import SMSCSS from "./SMS.module.scss";
import SendSMS from "../../../../Modules/SendSMS/SendSMS";
import NoBalance from "../../../../Pages/NoBalance/NoBalance";
import PhoneNotAvailable from "../../../../Pages/PhoneNotAvailable/PhoneNotAvailable";

const isBalance = localStorage.getItem("balance");
const isPhone = localStorage.getItem("phone");

const isLoggedIn = localStorage.getItem("jwt");

const SMS = () => {
  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
  }, []);

  return (
    <div className={SMSCSS.container}>
      {isBalance == 0 ? (
        <NoBalance />
      ) : !isPhone ? (
        <PhoneNotAvailable />
      ) : (
        <SendSMS />
      )}
    </div>
  );
};

export default SMS;
