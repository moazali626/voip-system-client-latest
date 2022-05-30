import React, { useEffect } from "react";
import PaymentFailedCSS from "./PaymentFailed.module.scss";
import errorImg from "../../../images/error.png";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const isLoggedIn = localStorage.getItem("jwt");

const PaymentFailed = () => {
  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
  }, []);
  return (
    <div className={PaymentFailedCSS.container}>
      <div className={PaymentFailedCSS.container}>
        <div className={PaymentFailedCSS.wrapper}>
          <img src={errorImg} alt="error" width="90px" />
          <p style={{ color: "red" }}>Transaction Failed!</p>
          <p>
            <b>Reason: </b> User cancelled the deposit request.
          </p>
          <Link to="/">
            <Button variant="outlined" color="primary" value="1">
              GO BACK TO HOMEPAGE
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
