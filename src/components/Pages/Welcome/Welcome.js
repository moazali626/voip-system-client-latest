import React from "react";
import WelcomeCSS from "./Welcome.module.scss";
import WelcomeImg from "../../../images/welcome.jpg";
import Button from "@material-ui/core/Button";

const Welcome = () => {
  return (
    <div className={WelcomeCSS.container}>
      <div className={WelcomeCSS.wrapper}>
        <div className={WelcomeCSS["content"]}>
          <img src={WelcomeImg} alt="welcome" width="380px" />
          <h1>Thank you for registering!</h1>
          <p>Please login using the below button</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => (window.location = "/login")}
          >
            Go To Login Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
