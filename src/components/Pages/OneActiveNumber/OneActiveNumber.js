import React from "react";
import OneActiveNumberCSS from "./OneActiveNumber.module.scss";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import dollarImg from "../../../images/credit-card.png";

const OneActiveNumber = () => {
  return (
    <div className={OneActiveNumberCSS.container}>
      <div className={OneActiveNumberCSS.wrapper}>
        <img src={dollarImg} alt="dollar" width="200px" />
        <p>
          You already have an active virtual phone number.{" "}
          <p style={{ color: "red" }}>
            Each account is limited to only one virtual phone number.
          </p>{" "}
          {/* If you want to change or delete your phone number, please
          <Link to="/support-center">
            {" "}
            <p
              style={{
                display: "inline",
                textDecoration: "none",
                color: "blue",
              }}
            >
              contact us
            </p>{" "}
          </Link>
          freely. */}
        </p>

        <Link to="/inbox" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary" value="1">
            GO BACK TO HOMEPAGE
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OneActiveNumber;
