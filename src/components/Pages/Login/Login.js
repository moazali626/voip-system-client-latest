import React, { useRef, useState, useContext } from "react";
import LoginCSS from "./Login.module.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import CredientialWrapper from "../../UI/CredientialWrapper/CredientialWrapper";

const Login = () => {
  const [isValidLogin, setIsValidLogin] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const user = await axios.post("http://localhost:4000/login-client", {
        email,
        password,
      });

      if (!user.data.user._id) {
        setIsValidLogin(false);
      } else {
        setIsValidLogin(true);

        localStorage.setItem("id", user.data.user._id);
        localStorage.setItem("email", user.data.user.email);
        localStorage.setItem("jwt", user.data.token);
        localStorage.setItem("name", user.data.user.name);
        localStorage.setItem("balance", user.data.user.balance);

        if (user.data.phone != 0) {
          localStorage.setItem("phone", user.data.user.phone);
        }
        window.location = "/inbox";
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <CredientialWrapper>
        <p className={LoginCSS["sign-in-page-heading"]}>Sign In</p>
        <form onSubmit={loginHandler}>
          <div className={LoginCSS["email"]}>
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              margin="dense"
              style={{ height: 50, width: 280 }}
              required
              inputRef={emailRef}
            />
          </div>
          <div className={LoginCSS["password"]}>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              margin="dense"
              style={{ width: 280, marginBottom: "1.5rem" }}
              required
              inputRef={passwordRef}
            />
          </div>
          {!isValidLogin && isFormSubmitted && (
            <p style={{ color: "red", fontSize: "15px", marginBottom: "1rem" }}>
              Email or Password is Incorrect
            </p>
          )}
          <Button
            className={LoginCSS["login-page-btn"]}
            variant="contained"
            color="primary"
            type="submit"
          >
            Log in
          </Button>
        </form>
        <hr className={LoginCSS["login-page-divider"]} />
        <div className={LoginCSS["dont-have-account"]}>
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ color: "black", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </CredientialWrapper>
    </React.Fragment>
  );
};

export default Login;
