import React from "react";
import NoBalanceCSS from "./NoBalance.module.scss";
import dollarImg from "../../../images/no-balance.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const NoBalance = (props) => {
  const pageName = props.pageLocation;
  return (
    <div className={NoBalanceCSS.container}>
      <div className={NoBalanceCSS.wrapper}>
        <img src={dollarImg} alt="dollar" width="200px" />
        {pageName == "BuyVirtualNumber" ? (
          <p>
            Atleast <p style={{ color: "red", display: "inline" }}>$1</p>{" "}
            balance is required to buy a virual phone number. Please topup your
            account before using any of our services.
          </p>
        ) : (
          <p>
            You don't have any credits in your account.
            <p>Please topup your account before using any of our services.</p>
          </p>
        )}
        <Link to="/amount" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary" value="1">
            ADD BALANCE
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoBalance;
