import React from "react";
import PhoneNotAvailableLiveCallCSS from "./PhoneNotAvailableLiveCall.module.scss";
import errorImg from "../../../images/error.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const PhoneNotAvailable = () => {
  return (
    <div className={PhoneNotAvailableLiveCallCSS.container}>
      <div className={PhoneNotAvailableLiveCallCSS.wrapper}>
        <img src={errorImg} alt="dollar" width="150px" />
        <p>You must have an active phone number to access this feature.</p>

        <Link to="/buy-virtual-number" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary" value="1">
            BUY VIRTUAL PHONE NUMBER
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PhoneNotAvailable;
