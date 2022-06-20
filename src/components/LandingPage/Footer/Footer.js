import React from "react";
import FooterCSS from "./Footer.module.scss";
import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <footer className={FooterCSS}>
      {/* <p>
        Copyright © All Rights Reserved |{" "}
        <Link to="/privacy-policy" className={FooterCSS["footer-links"]}>
          Privacy Policy
        </Link>
        |{" "}
        <Link to="/disclaimer" className={FooterCSS["footer-links"]}>
          Disclaimer
        </Link>{" "}
        |
        <Link to="/contact" className={FooterCSS["footer-links"]}>
          {" "}
          Contact
        </Link>
      </p> */}
      <p>Copyright © All Rights Reserved</p>
      {/* <p> | </p>
      <Link
        to="/privacy-policy"
        className={FooterCSS["footer-links"]}
        style={{ color: "white" }}
      >
        Privacy Policy
      </Link>
      <p> | </p>
      <Link
        to="/disclaimer"
        className={FooterCSS["footer-links"]}
        style={{ color: "white" }}
      >
        Disclaimer
      </Link>
      <p> | </p>
      <Link
        to="/contact"
        className={FooterCSS["footer-links"]}
        style={{ color: "white" }}
      >
        Contact
      </Link> */}
      {/* <p> | </p> */}
    </footer>
  );
};

export default FooterPage;
