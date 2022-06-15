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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isRequestCompleted, setIsRequestCompleted] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [ElapsedTime, setElapsedTime] = useState();
  const [isScheduled, setIsScheduled] = useState(false);
  // const [selectDateError, setSelectDateError] = useState(false);
  const [recipeint, setRecpient] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState();

  const senderNumber = localStorage.getItem("phone");
  const userId = localStorage.getItem("id");

  // const recipeintRef = useRef();
  // const messageRef = useRef();

  let elapsed;

  const scheduleSMSHandler = (e) => {
    e.preventDefault();

    setIsSubmitted(true);
    setSelectedDate(e.target.value);

    let start = new Date();
    let end = new Date(e.target.value);

    elapsed = end.getTime() - start.getTime(); // elapsed time in milliseconds

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

    setTimeout(() => {
      result = fetch(
        `http://localhost:4000/send/?phone=${recipeint}&message=${message}`,
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

  // const scheduleSMSHandler2 = () => {};

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

    if (result.ok) {
      setIsRequestCompleted(true);
      console.log("error not set");
    } else {
      console.log("error set");
      setIsRequestCompleted(false);
      setError(true);
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
              variant="outlined"
              fullWidth
              type="number"
              onChange={(e) => setRecpient(e.target.value)}
              required
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
              variant="outlined"
              width="400px"
              fullWidth
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              required
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
            disable={name.length <= 0}
            disabled={message.length <= 0}
          >
            Send Now
          </Button>
        </div>
        <div>
          <Button
            type="submit"
            onClick={submitScheduleSMSHandler}
            style={buttonStyle}
            style={{
              position: "absolute",
              top: "104%",
              left: "32%",
              marginLeft: "30px",
            }}
            variant="contained"
            color="primary"
            // disabled={isSubmitted == false}
            // disabled={dateError}
          >
            Schedule Later
          </Button>
        </div>
        {/* Date picker */}
        <Stack component="form" noValidate spacing={3}>
          <TextField
            id="datetime-local"
            label="Select Date & Time"
            type="datetime-local"
            // defaultValue="2022-04-18T10:30"
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
      {/* {selectDateError && (
        <p
          style={{
            color: "red",
            marginTop: "0.5rem",
            fontSize: "1rem",
            marginLeft: "0.7rem",
          }}
        >
          Please select a date & time
        </p>
      )} */}
    </div>
  );
};

export default SendSMS;
