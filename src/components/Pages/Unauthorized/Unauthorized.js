import React from "react";
import UnauthorizedCSS from "./Unauthorized.module.scss";
import UnauthorizedImg from "../../../images/401.png";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Unauthorized = () => {
  return (
    <div className={UnauthorizedCSS.container}>
      <img
        src={UnauthorizedImg}
        alt="401"
        width="400px"
        style={{ marginBottom: "1rem" }}
      />
      <h2 style={{ marginBottom: "1rem" }}>Access Denied</h2>
    </div>
  );
};

export default Unauthorized;
