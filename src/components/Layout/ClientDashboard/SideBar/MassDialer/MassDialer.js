import React, { useEffect } from "react";
import NoBalance from "../../../../Pages/NoBalance/NoBalance";
import MassDialerCSS from "./MassDialer.module.scss";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import InsufficientBalanceMass from "../../../../Pages/InsufficientBalanceMass.js/InsufficientBalanceMass";
import PhoneNotAvailableMass from "../../../../Pages/PhoneNotAvailableMass/PhoneNotAvailableMass";
import errorImg from "../../../../../images/error.png";

const isBalance = localStorage.getItem("balance");
const isPhone = localStorage.getItem("phone");
const isLoggedIn = localStorage.getItem("jwt");

const MassDialer = () => {
  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
  }, []);

  return (
    <div className={MassDialerCSS.container}>
      {isBalance <= 0 ? (
        <InsufficientBalanceMass />
      ) : !isPhone ? (
        // <div style={{ textAlign: "center" }}>
        //   <img src={errorImg} alt="" width="150px" />
        //   <h3 style={{ marginTop: "1rem" }}>
        //     You must have active phone number
        //   </h3>
        // </div>
        <PhoneNotAvailableMass />
      ) : (
        <div className={MassDialerCSS.wrapper}>
          <p
            style={{
              textAlign: "center",
              fontSize: "1.4rem",
              marginBottom: "1.6rem",
              fontWeight: "bold",
            }}
          >
            Mass Automatic Dialer System
          </p>
          <Link to="/broadcast" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ height: "3rem", marginRight: "1rem" }}
            >
              Broadcast Audio File
            </Button>
          </Link>
          <Link to="./convert-to-mp3" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ height: "3rem" }}
            >
              Convert Text To Speech
            </Button>
          </Link>
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            You will be charged <span style={{ color: "red" }}>$0.00083</span>{" "}
            per second
          </p>
        </div>
      )}
    </div>
  );
};

export default MassDialer;
