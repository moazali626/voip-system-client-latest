import React, { useEffect } from "react";
import axios from "axios";

const isLoggedIn = localStorage.getItem("jwt");

let balanceToBeUpdated = localStorage.getItem("topup");

const PaymentCheck = () => {
  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
    const updateBalance = async () => {
      balanceToBeUpdated = parseInt(balanceToBeUpdated);

      if (balanceToBeUpdated) {
        let currentBalance = localStorage.getItem("balance");
        currentBalance = parseInt(currentBalance);
        let newBalance = currentBalance + balanceToBeUpdated;

        localStorage.removeItem("balance");
        localStorage.setItem("balance", newBalance);

        const userId = localStorage.getItem("id");

        await axios.post("http://localhost:4000/add-balance-manually", {
          headers: {
            id: userId,
            amount: newBalance,
          },
        });
        window.location = "/payment-success";
      }
    };
    updateBalance();
  }, []);
  return <></>;
};

export default PaymentCheck;
