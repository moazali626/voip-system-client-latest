import React, { useEffect } from "react";
import NumberPurchasedCSS from "./NumberPurchased.module.scss";
import successImg from "../../../images/success.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const isLoggedIn = localStorage.getItem("jwt");

const NumberPurchased = () => {
  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
  }, []);
  return (
    <div className={NumberPurchasedCSS.container}>
      <div>
        <img src={successImg} width="120px" alt="success" />
      </div>
      <div>
        <p>Virtual Number has been purchased successfully</p>
      </div>
      <Link to="/">
        <Button variant="outlined" color="primary" value="1">
          GO BACK TO HOMEPAGE
        </Button>
      </Link>
    </div>
  );
};

export default NumberPurchased;
