import React, { useEffect, useState } from "react";
import PaymentSuccessCSS from "./PaymentSuccess.module.scss";
import successImg from "../../../images/success.png";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

const isLoggedIn = localStorage.getItem("jwt");
const topupAmount = localStorage.getItem("topup");

let balanceToBeUpdated = localStorage.getItem("topup");

const PaymentSuccess = () => {
  // const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
    // if (load == "false") {
    //   setLoad(true);
    //   window.location.reload();
    // }
  }, []);

  window.onload = function () {
    if (!localStorage.justOnce) {
      localStorage.setItem("justOnce", "true");
      window.location.reload();
    }
  };

  return (
    <div className={PaymentSuccessCSS.container}>
      <div className={PaymentSuccessCSS.container}>
        <div className={PaymentSuccessCSS.wrapper}>
          <img src={successImg} alt="success" width="90px" />
          <p style={{ color: "green" }}>
            Your account has been successfully credited.
          </p>
          <p>
            Amount: <b>${topupAmount}</b>
          </p>
          <Link to="/inbox" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="primary"
              value="1"
              // onClick={() => window.location.reload()}
            >
              GO BACK TO HOMEPAGE
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
