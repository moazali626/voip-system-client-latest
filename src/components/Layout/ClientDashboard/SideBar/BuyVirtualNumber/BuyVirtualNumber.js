import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BuyVirtualNumberCSS from "./BuyVirtualNumber.module.scss";
import NoBalance from "../../../../Pages/NoBalance/NoBalance";
import VirtualNumberImg from "../../../../../images/virtual-number.svg";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import OneActiveNumber from "../../../../Pages/OneActiveNumber/OneActiveNumber";

const isLoggedIn = localStorage.getItem("jwt");

export default function DialogSelect() {
  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
  }, []);

  const [open, setOpen] = React.useState(false);
  const [number, setNumber] = React.useState(""); //material-ui useState
  const [availableNumber, setAvailableNumber] = React.useState(); //mongodb fetched numbers

  let numbers;

  const isBalance = localStorage.getItem("balance");
  const id = localStorage.getItem("id");
  const isPhoneExists = localStorage.getItem("phone");

  React.useEffect(() => {
    const getNumbers = async () => {
      numbers = await axios.get("http://localhost:4000/get-numbers");
      setAvailableNumber(numbers.data);
    };
    getNumbers();
  }, []);

  const handleChange = (event) => {
    setNumber(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const numberPurchasedHandler = async () => {
    await axios.post("http://localhost:4000/number-purchased", {
      headers: {
        boughtNumber: number,
        userId: id,
      },
    });

    //Updating Balance in dashboard/localstorage
    const currentBalance = localStorage.getItem("balance");
    localStorage.setItem("balance", currentBalance - 1);

    //To block access to "buy virtual number" after purchase of 1 number
    localStorage.setItem("number", "active");
    localStorage.setItem("phone", number);

    //Redirecting after successfull number purchase
    window.location.href = "/number-purchased";
    console.log("ended");
  };

  return (
    <>
      {}
      {isBalance < 1 ? (
        <NoBalance pageLocation={"BuyVirtualNumber"} />
      ) : isPhoneExists != 0 ? (
        <OneActiveNumber />
      ) : (
        <div className={BuyVirtualNumberCSS.container}>
          <div>
            <img
              //   style={{ marginTop: "21rem" }}
              src={VirtualNumberImg}
              alt="virtual phone number"
            />
          </div>
          <Button
            style={{ border: "2px solid #303F9F" }}
            onClick={handleClickOpen}
          >
            CHECK AVAILABLE PHONE NUMBERS
          </Button>

          <Dialog
            fullWidth
            maxWidth="sm"
            disableEscapeKeyDown
            open={open}
            onClose={handleClose}
          >
            <DialogTitle className={BuyVirtualNumberCSS.center}>
              Select your preferred phone number
            </DialogTitle>
            <DialogContent>
              <Box
                className={BuyVirtualNumberCSS.center}
                component="form"
                sx={{ display: "flex", flexWrap: "wrap" }}
              >
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel htmlFor="demo-dialog-native">Pick</InputLabel>
                  <Select
                    style={{ width: "200px" }}
                    native
                    value={number}
                    onChange={handleChange}
                    className={BuyVirtualNumberCSS.center}
                    input={
                      <OutlinedInput label="Number" id="demo-dialog-native" />
                    }
                  >
                    <option aria-label="None" value="" />
                    {availableNumber &&
                      availableNumber.map((item) => {
                        let { phone } = item;
                        return <option value={phone}>+1-{phone} ~ $1</option>;
                      })}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() => {
                  handleClose();
                  numberPurchasedHandler();
                }}
              >
                Buy Now
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
