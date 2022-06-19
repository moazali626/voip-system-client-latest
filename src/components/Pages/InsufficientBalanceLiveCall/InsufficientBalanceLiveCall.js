import React from "react";
import InsufficientBalanceLiveCallCSS from "./InsufficientBalanceLiveCall.module.scss";
import dollarImg from "../../../images/no-balance.png";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const InsufficientBalanceLiveCall = (props) => {
  return (
    <div className={InsufficientBalanceLiveCallCSS.container}>
      <div className={InsufficientBalanceLiveCallCSS.wrapper}>
        <img src={dollarImg} alt="dollar" width="200px" />
        <p>You don't have any credits in your account.</p>
        <p>Please topup your account before using any of our services.</p>
        <Link to="/amount" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary" value="1">
            ADD BALANCE
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InsufficientBalanceLiveCall;
