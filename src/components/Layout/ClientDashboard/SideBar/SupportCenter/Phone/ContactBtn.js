import React from "react";
import ContactBtnCSS from "./ContactBtn.module.scss";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const ContactBtn = () => {
  return (
    <div className={ContactBtnCSS.container}>
      <p>If you still have questions, feel free to contact us</p>
      <div className={ContactBtnCSS["btn-wrapper"]}>
        <Link to="/contact" style={{ color: "black", textDecoration: "none" }}>
          <Button
            variant="outlined"
            color="primary"
            style={{
              marginTop: "1rem",
              padding: "0.7rem 1.4rem",
            }}
          >
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ContactBtn;
