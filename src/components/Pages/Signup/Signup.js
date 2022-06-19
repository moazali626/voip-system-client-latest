import React, { useState, useEffect, useReducer } from "react";
import SignupCSS from "./Signup.module.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CredientialWrapper from "../../UI/CredientialWrapper/CredientialWrapper";
import axios from "axios";

const initial = {
  name: "",
  nameIsValid: false,
  nameIsTouched: false,

  email: "",
  emailIsValid: false,
  emailIsTouched: false,

  password: "",
  passwordIsValid: false,
  passwordIsTouched: false,

  confirmPassword: "",
  confirmPasswordIsValid: false,
  confirmPasswordIsTouched: false,

  termsIsValid: false,
  formIsValid: false,
  isDuplicate: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};

const Signup = () => {
  const [state, dispatch] = useReducer(reducer, initial);

  const {
    name,
    nameIsValid,
    nameIsTouched,
    email,
    emailIsValid,
    emailIsTouched,
    password,
    passwordIsValid,
    passwordIsTouched,
    confirmPassword,
    confirmPasswordIsValid,
    confirmPasswordIsTouched,
    termsIsValid,
    formIsValid,
    isDuplicate,
  } = state;

  useEffect(() => {
    if (
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid &&
      termsIsValid
    ) {
      dispatch({ type: "formIsValid", payload: true });
    } else {
      dispatch({ type: "formIsValid", payload: false });
    }
  }, [
    nameIsValid,
    emailIsValid,
    passwordIsValid,
    confirmPasswordIsValid,
    termsIsValid,
  ]);

  const nameHandler = (e) => {
    dispatch({ type: "name", payload: e.target.value });

    const string = /^[A-Za-z_ ]{4,}$/;
    const regexTest = string.test(e.target.value.trim());
    if (regexTest) {
      dispatch({ type: "nameIsValid", payload: true });
    }
  };

  const blurNameHandler = (e) => {
    dispatch({ type: "nameIsTouched", payload: true });

    const string = /^[A-Za-z_ ]{4,}$/;
    const regexTest = string.test(e.target.value.trim());

    if (!regexTest) {
      dispatch({ type: "nameIsValid", payload: false });
      return;
    }
    dispatch({ type: "nameIsValid", payload: true });
  };

  const emailHandler = (e) => {
    dispatch({ type: "email", payload: e.target.value });

    const string =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexTest = string.test(e.target.value.trim());
    if (regexTest) {
      dispatch({ type: "emailIsValid", payload: true });
    }
  };

  const blurEmailHandler = (e) => {
    dispatch({ type: "emailIsTouched", payload: true });

    const string =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexTest = string.test(e.target.value.trim());

    if (!regexTest) {
      dispatch({ type: "emailIsValid", payload: false });
      return;
    }
    dispatch({ type: "emailIsValid", payload: true });
  };

  const passwordHandler = (e) => {
    dispatch({ type: "password", payload: e.target.value });
    const string = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})$/;
    const regexTest = string.test(e.target.value.trim());
    if (regexTest) {
      dispatch({ type: "passwordIsValid", payload: true });
    }
  };

  const blurPasswordHandler = (e) => {
    dispatch({ type: "passwordIsTouched", payload: true });

    const string = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})$/;
    const regexTest = string.test(e.target.value.trim());

    if (!regexTest) {
      dispatch({ type: "passwordIsValid", payload: false });
      return;
    }
    dispatch({ type: "passwordIsValid", payload: true });
  };

  const ConfirmPasswordHandler = (e) => {
    dispatch({ type: "confirmPassword", payload: e.target.value });

    if (password === e.target.value) {
      dispatch({ type: "confirmPasswordIsValid", payload: true });
    }
  };

  const blurConfirmPasswordHandler = (e) => {
    dispatch({ type: "confirmPasswordIsTouched", payload: true });

    if (password !== confirmPassword) {
      dispatch({ type: "confirmPasswordIsValid", payload: false });

      return;
    }
    dispatch({ type: "confirmPasswordIsValid", payload: true });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post("http://localhost:4000/register-client", {
        name,
        email,
        password,
      });

      localStorage.setItem("id", user.data.profile.id);
      localStorage.setItem("email", user.data.profile.email);
      localStorage.setItem("jwt", user.data.token);
      localStorage.setItem("name", user.data.profile.name);
      localStorage.setItem("balance", user.data.profile.balance);

      if (user.data.error === "duplicate") {
        return dispatch({ type: "isDuplicate", payload: true });
      }

      if (!user.data.error) {
        window.location = "/inbox";
      }
    } catch (e) {
      console.log(e);
    }
  };

  const nameError = !nameIsValid && nameIsTouched;
  const duplicateEmailError = isDuplicate;
  const emailError = !emailIsValid && emailIsTouched;
  const passwordError = !passwordIsValid && passwordIsTouched;
  const confirmPasswordError =
    !confirmPasswordIsValid && confirmPasswordIsTouched;

  const error = {
    name: "Name must contain atleast 4 alphabetic characters",
    duplicateEmail: "Email already exists",
    email: "Email address is not valid",
    password:
      "Password must be 8 characters long with 1 number, 1 lowercase, 1 uppercase & 1 special character",
    confirmPassword: "Passwords do not match",
  };

  return (
    <CredientialWrapper className={SignupCSS["sign-in-page-heading"]}>
      <div className={SignupCSS["signup-information"]}>
        <div className={SignupCSS["text-fields-wrapper"]}>
          <p className={SignupCSS["sign-up-page-heading"]}>Sign up</p>
          <form onSubmit={submitHandler}>
            <div className={SignupCSS["name"]}>
              <TextField
                label="Full Name"
                variant="outlined"
                margin="dense"
                style={{ height: 50, width: 280 }}
                onChange={nameHandler}
                onBlur={blurNameHandler}
                value={name}
                inputProps={{
                  maxLength: 40,
                }}
                required
              />
            </div>
            {nameError && <p className={SignupCSS.error}>{error.name}</p>}

            <div className={SignupCSS["email"]}>
              <TextField
                variant="outlined"
                label="Email"
                margin="dense"
                style={{ height: 50, width: 280 }}
                onChange={emailHandler}
                value={email}
                onBlur={blurEmailHandler}
                required
              />
            </div>
            {duplicateEmailError && (
              <p className={SignupCSS.error}>{error.duplicateEmail}</p>
            )}

            {emailError && <p className={SignupCSS.error}>{error.email}</p>}
            <div className={SignupCSS["password"]}>
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                margin="dense"
                style={{ height: 50, width: 280 }}
                onChange={passwordHandler}
                onBlur={blurPasswordHandler}
                value={password}
                required
              />
            </div>
            {passwordError && (
              <p className={SignupCSS.error}>{error.password}</p>
            )}
            <div className={SignupCSS["confirm-password"]}>
              <TextField
                variant="outlined"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                margin="dense"
                style={{ height: 50, width: 280 }}
                value={confirmPassword}
                onChange={ConfirmPasswordHandler}
                onBlur={blurConfirmPasswordHandler}
                required
              />
            </div>
            {confirmPasswordError && (
              <p className={SignupCSS.error}>{error.confirmPassword}</p>
            )}
            <div className={SignupCSS["checkbox-signup"]}>
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                onClick={() => {
                  dispatch({ type: "termsIsValid", payload: !termsIsValid });
                }}
              />
              <p style={{ display: "inline-block", fontSize: "15px" }}>
                I agree to the terms & conditions
              </p>
            </div>
            <Button
              className={SignupCSS["sign-up-page-btn"]}
              variant="contained"
              color="primary"
              disabled={!formIsValid}
              type="submit"
            >
              Sign up
            </Button>
          </form>
        </div>
      </div>
    </CredientialWrapper>
  );
};

export default Signup;
