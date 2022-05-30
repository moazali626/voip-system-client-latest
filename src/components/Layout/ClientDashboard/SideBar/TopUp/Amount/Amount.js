import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AmountCSS from "./Amount.module.scss";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { TopUpContext } from "../Context/TopUpContext";
import { ProfileContext } from "../../../../../context/ProfileContext/ProfileContext";
import SideBarMenu from "../../../../../UI/SideBarMenu/SideBarMenu";
import { Redirect } from "react-router-dom";
import IsLoggedIn from "../../../../../Modules/IsLoggedIn/IsLoggedIn";

const isLoggedIn = localStorage.getItem("jwt");

const TopUp = () => {
  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
  }, []);

  const { selected, amount } = useContext(TopUpContext);
  // const [selectedTopUpItem, setSelectedTopUpItem] = selected;
  const [topUpAmount, setTopUpAmount] = amount;

  const customAmountHandler = (e) => {
    setTopUpAmount(e.target.value);
  };

  return (
    <div className={AmountCSS.container}>
      <div className={AmountCSS["payment-amount"]}>
        <p>Select your TopUp amount</p>
        <div className={AmountCSS["topup-btn-wrapper"]}>
          <Link
            to={{
              pathname: `/payment`,
              state: { value: 1 },
            }}
          >
            <Button
              className={AmountCSS["amount-btn"]}
              variant="outlined"
              color="primary"
              value="1"
              // onClick={() => {
              //   setTopUpAmount(1);
              //   setSelectedTopUpItem(1);
              //   console.log(topUpAmount);
              // }}
              // onClick={() => {
              //   <Redirect to="/payment"></Redirect>;
              //   console.log("test");
              // }}
            >
              $1
            </Button>
          </Link>
          <Link
            to={{
              pathname: "/payment",
              state: { value: 5 },
            }}
          >
            <Button
              className={AmountCSS["amount-btn"]}
              variant="outlined"
              color="primary"
              value="5"
              // onClick={() => {
              //   setTopUpAmount(5);
              //   setSelectedTopUpItem(1);
              // }}
            >
              $5
            </Button>
          </Link>
          <Link
            to={{
              pathname: "/payment",
              state: { value: 10 },
            }}
          >
            <Button
              className={AmountCSS["amount-btn"]}
              variant="outlined"
              color="primary"
              value="10"
              // onClick={() => {
              //   setTopUpAmount(10);
              //   setSelectedTopUpItem(1);
              // }}
            >
              $10
            </Button>
          </Link>
        </div>
        <div style={AmountCSS["custom-amount-wrapper"]}>
          <span
            style={{ position: "relative", top: "1.45rem", fontSize: "1.3rem" }}
          >
            ${" "}
          </span>
          <TextField
            className={AmountCSS["custom-amount-btn"]}
            variant="outlined"
            size="small"
            placeholder="Custom Amount"
            onChange={customAmountHandler}
          ></TextField>
        </div>
        {topUpAmount != 0 && (
          <Link
            to={{
              pathname: "payment",
              state: { value: topUpAmount },
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: "0.2rem" }}
              // onClick={() => setSelectedTopUpItem(1)}
            >
              TopUp
            </Button>
          </Link>
        )}
        {/* {selectedIndex == 1 && <Redirect to="/edit-profile"></Redirect>} */}
      </div>
    </div>
  );
};

export default TopUp;
