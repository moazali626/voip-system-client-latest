import React from "react";
import Image404 from "../../../images/404.jpg";
import NotFoundCSS from "./NotFound.module.scss";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={NotFoundCSS.container}>
      <img src={Image404} alt="404" width="900px" />
      <Link to="/">
        <Button
          variant="outlined"
          color="secondary"
          style={{ padding: "1rem 2rem" }}
        >
          Go Back To Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
