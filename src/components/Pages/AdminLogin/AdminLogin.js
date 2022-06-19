import React, { useRef, useState, useContext } from "react";
import AdminLoginCSS from "./AdminLogin.module.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import CredientialWrapper from "../../UI/CredientialWrapper/CredientialWrapper";

const AdminLogin = () => {
  const [isValidLogin, setIsValidLogin] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginHandler = async (e) => {
    console.log("login ran");
    e.preventDefault();
    setIsFormSubmitted(true);
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const user = await axios.post("http://localhost:4000/admin-login", {
        email,
        password,
      });

      console.log(user);
      console.log("ajeeb", user.data.user._id);

      if (!user.data.user._id) {
        setIsValidLogin(false);
        console.log("if ran");
      } else {
        console.log("else ran");
        setIsValidLogin(true);

        localStorage.setItem("id", user.data.user._id);
        localStorage.setItem("email", user.data.user.email);
        localStorage.setItem("jwt", user.data.token);
        localStorage.setItem("name", user.data.user.name);

        window.location = "/add-balance";
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <CredientialWrapper>
        <p className={AdminLoginCSS["sign-in-page-heading"]}>Admin Panel</p>
        <form onSubmit={loginHandler}>
          <div className={AdminLoginCSS["email"]}>
            <TextField
              id="standard-basic"
              label="Email"
              variant="outlined"
              margin="dense"
              style={{ height: 50, width: 280 }}
              required
              inputRef={emailRef}
            />
          </div>
          <div className={AdminLoginCSS["password"]}>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              margin="dense"
              style={{ width: 280 }}
              required
              inputRef={passwordRef}
            />
          </div>
          {!isValidLogin && isFormSubmitted && (
            <p
              style={{
                color: "red",
                fontSize: "15px",
                marginTop: "0.8rem",
                // marginBottom: "1rem",
              }}
            >
              Email or Password is Incorrect
            </p>
          )}
          {/* <div className={AdminLoginCSS["password-reset"]}>
            <Link to="/reset-password">
              <p style={{ color: "black" }}>Forget Password?</p>
            </Link>
          </div> */}
          <Button
            className={AdminLoginCSS["login-page-btn"]}
            style={{ marginTop: "1rem" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Log in
          </Button>
        </form>
      </CredientialWrapper>
    </React.Fragment>
  );
};

export default AdminLogin;
