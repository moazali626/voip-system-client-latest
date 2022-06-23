import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
import Button from "@material-ui/core/Button";
import { useState, useRef } from "react";
import SendSMSCSS from "./SendSMS.module.scss";
import AppBar from "../../UI/AppBar/AppBar";
import DatePicker from "../../UI/DatePicker/DatePicker";
import Stack from "@mui/material/Stack";
import validator from "validator";

const SendSMS = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [isRequestCompleted, setIsRequestCompleted] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [ElapsedTime, setElapsedTime] = useState();
  const [isScheduled, setIsScheduled] = useState(false);
  const [recipeint, setRecpient] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState();
  const [isRecipientValid, setIsRecipientValid] = useState();

  const senderNumber = localStorage.getItem("phone");
  const userId = localStorage.getItem("id");

  let elapsed;

  const scheduleSMSHandler = (e) => {
    e.preventDefault();
    setSelectedDate(e.target.value);
    setIsSubmitted(true);
    let start = new Date();
    let end = new Date(e.target.value);

    elapsed = end.getTime() - start.getTime();

    setElapsedTime(elapsed);

    if (elapsed < 0) {
      setDateError(true);
      return;
    } else if (elapsed > 0) {
      setDateError(false);
    }
  };

  const submitScheduleSMSHandler = async (e) => {
    e.preventDefault();
    setIsScheduled(true);

    const recipientNew = recipeint;
    const messageNew = message;

    setRecpient("");
    setMessage("");

    setTimeout(() => {
      result = fetch(
        `http://localhost:4000/send/?phone=${recipientNew}&message=${messageNew}`,
        {
          headers: {
            senderNumber: senderNumber,
            userId: userId,
          },
        }
      );

      setIsSubmitted(true);
    }, ElapsedTime);
  };

  let result;

  const smsHandler = async (e) => {
    e.preventDefault();

    result = await fetch(
      `http://localhost:4000/send/?phone=${recipeint}&message=${message}`,
      {
        headers: {
          senderNumber: senderNumber,
          userId: userId,
        },
      }
    );

    setIsSubmitted(true);

    setRecpient("");
    setMessage("");

    if (result.ok) {
      setIsRequestCompleted(true);
    } else {
      setIsRequestCompleted(false);
      setError(true);
    }
  };

  const recipientHandler = (e) => {
    setRecpient(e.target.value);
    const isPhoneNumberValid = validator.isMobilePhone(e.target.value);
    console.log(isPhoneNumberValid);
    if (isPhoneNumberValid) {
      setIsRecipientValid(true);
    } else {
      setIsRecipientValid(false);
    }
  };

  const textStyle = {
    margin: "10px",
  };

  const buttonStyle = {
    position: "absolute",
    top: "104%",
    left: "3%",
  };

  return (
    <div className={SendSMSCSS.container}>
      <AppBar title={"SEND SMS"} />
      <form>
        <div>
          <Box width={350}>
            <TextField
              style={textStyle}
              id="outlined-basic"
              label="Recipient phone number"
              variant="standard"
              fullWidth
              onChange={recipientHandler}
              required
              value={recipeint}
            />
          </Box>
        </div>

        <div>
          <Box width={350}>
            <TextField
              style={textStyle}
              rows="7"
              cols="90"
              id="outlined-textarea"
              label="Message"
              multiline
              variant="standard"
              width="400px"
              fullWidth
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              required
              value={message}
            />
          </Box>
        </div>

        <div>
          <Button
            type="submit"
            style={buttonStyle}
            variant="contained"
            color="primary"
            onClick={smsHandler}
            disabled={isRecipientValid != true || message.length <= 0}
          >
            Send Now
          </Button>
        </div>
        <div>
          <Button
            type="submit"
            onClick={submitScheduleSMSHandler}
            style={{
              position: "absolute",
              top: "104%",
              left: "32%",
              marginLeft: "30px",
            }}
            variant="contained"
            color="primary"
            disabled={
              !selectedDate ||
              isRecipientValid != true ||
              message.length <= 0 ||
              dateError
            }
          >
            Schedule Later
          </Button>
        </div>
        <Stack component="form" noValidate spacing={3}>
          <TextField
            id="datetime-local"
            label="Select Date & Time"
            type="datetime-local"
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={scheduleSMSHandler}
            style={{ marginLeft: "0.7rem", marginTop: "0.7rem" }}
          />
        </Stack>
      </form>
      {isSubmitted && isRequestCompleted && (
        <p
          style={{
            color: "green",
            marginTop: "0.5rem",
            fontSize: "1rem",
            marginLeft: "0.7rem",
          }}
        >
          Your message has been sent successfully
        </p>
      )}
      {isSubmitted && error && (
        <p
          style={{
            color: "red",
            marginTop: "0.5rem",
            fontSize: "1rem",
            marginLeft: "0.7rem",
          }}
        >
          Sorry, something went wrong...
        </p>
      )}
      {dateError && (
        <p
          style={{
            color: "red",
            marginTop: "0.5rem",
            fontSize: "1rem",
            marginLeft: "0.7rem",
          }}
        >
          Please select a future date
        </p>
      )}
      {isScheduled && (
        <p
          style={{
            color: "green",
            marginTop: "0.5rem",
            fontSize: "1rem",
            marginLeft: "0.7rem",
            textAlign: "center",
          }}
        >
          SMS scheduled for {selectedDate}
        </p>
      )}
    </div>
  );
};

export default SendSMS;
