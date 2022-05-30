import React from "react";
import ResetPasswordCSS from "./ResetPassword.module.scss";
import CredientialWrapper from "../../UI/CredientialWrapper/CredientialWrapper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const ResetPassword = () => {
  return (
    <CredientialWrapper>
      <div className={ResetPasswordCSS.container}>
        <div className={ResetPasswordCSS.h1}>
          <h1>Forgot Password</h1>
        </div>
        <div className={ResetPasswordCSS["reset-password"]}>
          <TextField
            variant="outlined"
            label="Email"
            style={{ height: 45, width: 280 }}
            required
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={ResetPasswordCSS["reset-btn"]}
          style={{ padding: "0.7rem 1.7rem" }}
        >
          Reset Password
        </Button>
      </div>
    </CredientialWrapper>
  );
};

export default ResetPassword;
