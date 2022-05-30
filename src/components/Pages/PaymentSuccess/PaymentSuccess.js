import React, { useEffect, useState } from "react";
import PaymentSuccessCSS from "./PaymentSuccess.module.scss";
import successImg from "../../../images/success.png";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

const isLoggedIn = localStorage.getItem("jwt");

let balanceToBeUpdated = localStorage.getItem("topup");

const PaymentSuccess = () => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
    const updateBalance = async () => {
      balanceToBeUpdated = parseInt(balanceToBeUpdated);

      if (balanceToBeUpdated) {
        let currentBalance = localStorage.getItem("balance");
        currentBalance = parseInt(currentBalance);
        console.log("current balance", currentBalance);
        // console.log(typeof currentBalance);
        let newBalance = currentBalance + balanceToBeUpdated;
        console.log(typeof newBalance);
        console.log("new balance", newBalance);
        localStorage.removeItem("balance");
        localStorage.setItem("balance", newBalance);
        console.log("end of function");

        const userId = localStorage.getItem("id");

        await axios.post("http://localhost:4000/add-balance-manually", {
          headers: {
            id: userId,
            amount: newBalance,
          },
        });
      }
    };
    updateBalance();
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
            Amount: <b>${balanceToBeUpdated}</b>
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

export default PaymentSuccess;
