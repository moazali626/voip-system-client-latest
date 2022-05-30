import React, { useState, useContext } from "react";
import TopUpCSS from "./TopUp.module.scss";
import Amount from "./Amount/Amount";
import Payment from "./Payment/Payment";
import { TopUpContext } from "./Context/TopUpContext";
import Billing from "./Billing/Billing";

const TopUp = () => {
  const { selected, amount } = useContext(TopUpContext);
  const [selectedTopUpItem, setSelectedTopUpItem] = selected;
  const [topUpAmount, setTopUpAmount] = amount;

  return (
    <>
      <div className={TopUpCSS.container}>
        {selectedTopUpItem === 0 && <Amount />}
        {selectedTopUpItem === 1 && <Payment />}
        {selectedTopUpItem === 2 && <Billing />}
      </div>
    </>
  );
};

export default TopUp;
