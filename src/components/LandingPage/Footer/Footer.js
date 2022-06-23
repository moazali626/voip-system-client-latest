import React from "react";
import FooterCSS from "./Footer.module.scss";
import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <footer className={FooterCSS}>
      <p>Copyright © All Rights Reserved</p>
    </footer>
  );
};

export default FooterPage;
