import React, { useState } from "react";
import NavbarCSS from "./Navbar.module.scss";
import logo from "../../../images/logo.svg";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ReactDOM from "react-dom";
import Hamburger from "../Hamburger/Hamburger";

const Navbar = () => {
  const [isShow, setIsShow] = useState(false);

  const isShowHandler = (e) => {
    e.preventDefault();

    setIsShow(!isShow);
    console.log(isShow);
  };

  // if (document.body.style.overflow !== "hidden") {
  //   document.body.style.overflow = "hidden";
  // } else {
  //   document.body.style.overflow = "scroll";
  // }

  const isLoggedIn = localStorage.getItem("name");
  const isBalance = localStorage.getItem("balance");
  return (
    <>
      <header>
        <nav>
          <div className={NavbarCSS["logo-div"]}>
            <a href="#herobox">
              <img
                src={logo}
                alt="logo"
                style={{ marginRight: "0.5rem" }}
                className={NavbarCSS.logo}
              />
              <p style={{ float: "right", marginTop: "0.1rem" }}>VoIP System</p>
            </a>
          </div>
          <ul className={NavbarCSS["nav-links"]}>
            <a href="#products">
              <li className={NavbarCSS["cool-link"]}>Products</li>
            </a>

            <a href="#solutions">
              <li className={NavbarCSS["cool-link"]}>Solutions</li>
            </a>
            <a href="#pricing">
              <li className={NavbarCSS["cool-link"]}>Pricing</li>
            </a>
            <a href="#contact">
              <li className={NavbarCSS["cool-link"]}>Contact</li>
            </a>
          </ul>
          {!isLoggedIn ? (
            <div className={NavbarCSS["login-signup-btn"]}>
              <a href="/login" id="login-btn">
                <Link to="/login">
                  <button className={NavbarCSS.login}>LOG IN</button>
                </Link>
              </a>
              <a href="/signup" id="signup-btn">
                <Link to="/signup">
                  <button className={NavbarCSS.signup}>SIGN UP</button>
                </Link>
              </a>
            </div>
          ) : (
            <div className={NavbarCSS["login-signup-btn"]}>
              <a href="/client-dashboard">
                {!isBalance ? (
                  <Link to="/admin-dashboard">
                    <button className={NavbarCSS.dashboard}>Dashboard</button>
                  </Link>
                ) : (
                  <Link to="/client-dashboard">
                    <button className={NavbarCSS.dashboard}>Dashboard</button>
                  </Link>
                )}
              </a>
            </div>
          )}
        </nav>
        <div className={NavbarCSS.hamburger}>
          {isShow &&
            ReactDOM.createPortal(
              <Hamburger onClick={isShowHandler} />,
              document.getElementById("hamburger")
            )}
          <MenuIcon
            style={{
              fontSize: "2.5rem",
              color: "#fff",
            }}
            onClick={isShowHandler}
          />
        </div>
      </header>
    </>
  );
};

export default Navbar;
