import React, { useRef, useState } from "react";
import ContactCSS from "./Contact.module.scss";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import TextField from "@material-ui/core/TextField";
import BusinessIcon from "@material-ui/icons/Business";
import Button from "@material-ui/core/Button";
import axios from "axios";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState();
  // const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState();
  // const [message, setMessage] = useState("");
  const [isValidMessage, setIsValidMessage] = useState();

  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;

    const request = await axios.post("http://localhost:4000/send-message", {
      name,
      email,
      message,
    });

    if (request) {
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
      return setIsSubmitted(true);
    }
  };

  const nameHandler = (e) => {
    const string = /^[A-Za-z_ ]{4,}$/;
    const regexTest = string.test(e.target.value.trim());
    if (regexTest) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  };

  const emailHandler = (e) => {
    const string =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexTest = string.test(e.target.value.trim());
    if (regexTest) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const messageHandler = (e) => {
    const string = /^.{1,}$/;
    const regexTest = string.test(e.target.value.trim());
    if (regexTest) {
      setIsValidMessage(true);
    } else {
      setIsValidMessage(false);
    }
  };

  return (
    <div className={ContactCSS.wrapper} id="contact">
      <div className={ContactCSS.form}>
        <div className={ContactCSS["submit-request"]}>
          <ContactMailIcon className={ContactCSS["contact-icon"]} />
          <h1>Get In Touch</h1>
          <form autoComplete="off" onSubmit={submitHandler}>
            <div>
              <TextField
                className={ContactCSS.name}
                label="Full Name"
                variant="outlined"
                inputProps={{
                  maxLength: 80,
                }}
                onChange={nameHandler}
                inputRef={nameRef}
                required
                // value={name}
              />

              <TextField
                className={ContactCSS.email}
                label="Email"
                type="email"
                variant="outlined"
                inputProps={{
                  maxLength: 254,
                }}
                onChange={emailHandler}
                required
                inputRef={emailRef}
                // value={email}
              />
              <TextField
                className={ContactCSS.message}
                label="Message"
                variant="outlined"
                multiline
                rows={7}
                inputRef={messageRef}
                onChange={messageHandler}
                inputProps={{
                  maxLength: 1000,
                }}
                // value={message}
                required
              />
              <div></div>
            </div>
            <div>
              <Button
                variant="contained"
                type={isValidName ? "Submit" : "button"}
                color="primary"
                onClick={submitHandler}
                size="large"
                className={ContactCSS.submit}
                style={{ display: "relative", top: "125px" }}
                disabled={!isValidName || !isValidEmail || !isValidMessage}
              >
                Send Message
              </Button>
            </div>
            {isSubmitted && (
              <p style={{ color: "green", marginTop: "9rem" }}>
                Your message has been sent successfully.
              </p>
            )}
          </form>
        </div>
        <div className={ContactCSS["address"]}>
          <BusinessIcon className={ContactCSS["address-icon"]} />
          <h1>Visit Us</h1>
          <div className={ContactCSS["google-map"]}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.552537364144!2d74.33193516477914!3d31.481493006211448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904186ed22ac9%3A0x3bc1462857ab9e62!2sSurgivision!5e0!3m2!1sen!2s!4v1626975175535!5m2!1sen!2s"
              width="460"
              height="317"
              frameborder="0"
              allowfullscreen=""
              loading="lazy"
              title="map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
