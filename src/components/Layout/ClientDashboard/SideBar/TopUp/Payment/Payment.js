import React, { useContext, useEffect } from "react";
import PaymentCSS from "./Payment.module.scss";
import creditCardImg from "../../../../../../images/credit-card.png";
import paypalImg from "../../../../../../images/paypal.png";
import { TopUpContext } from "../Context/TopUpContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import stripe from "stripe";

const isLoggedIn = localStorage.getItem("jwt");

const Payment = (props) => {
  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
  }, []);

  //Getting user entered balance from amount page
  const location = useLocation();
  const balanceAmount = location.state.value;

  const { selected, amount } = useContext(TopUpContext);
  // const [selectedTopUpItem, setSelectedTopUpItem] = selected;
  // const [topUpAmount, setTopUpAmount] = amount;

  const paymentHandler = async () => {
    const result = await axios.post("http://localhost:4000/payment", {
      balanceAmount,
    });

    localStorage.setItem("topup", balanceAmount);

    window.location = `${result.data.url}`;
  };
  return (
    <>
      <div className={PaymentCSS.container}>
        <h3>Please select your preferred payment method</h3>
        <h3>
          Amount to be deposited:{" "}
          <p style={{ color: "red", display: "inline" }}>${balanceAmount}</p>
        </h3>
        <div className={PaymentCSS.wrapper}>
          <div>
            <img
              src={creditCardImg}
              width="200px"
              alt="card payment"
              // onClick={() => setSelectedTopUpItem(2)}
              onClick={paymentHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
