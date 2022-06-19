import React, { useEffect } from "react";
import NoBalance from "../../../../Pages/NoBalance/NoBalance";
import MassDialerCSS from "./MassDialer.module.scss";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import InsufficientBalanceMass from "../../../../Pages/InsufficientBalanceMass.js/InsufficientBalanceMass";

const isBalance = localStorage.getItem("balance");

const isLoggedIn = localStorage.getItem("jwt");

const MassDialer = () => {
  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
  }, []);

  return (
    <div className={MassDialerCSS.container}>
      {isBalance == 0 ? (
        <InsufficientBalanceMass />
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
        </div>
      )}
    </div>
  );
};

export default MassDialer;
