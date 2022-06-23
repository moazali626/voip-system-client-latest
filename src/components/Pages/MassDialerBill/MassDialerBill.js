import React, { useEffect, useState } from "react";
import MassDialerCSS from "./MassDialer.module.scss";
import axios from "axios";

const MassDialerBill = (props) => {
  const [totalSeconds, setTotalSeconds] = useState();
  const [actualCost, setActualCost] = useState();
  const [duration, setDuration] = useState();
  const [length, setLength] = useState();

  useEffect(() => {
    const duration = localStorage.getItem("duration");
    const length = localStorage.getItem("length");
    setLength(length);
    setDuration(duration);
    const totalSecondsInvolved = duration * length;

    setTotalSeconds(totalSecondsInvolved);

    const actualCost = totalSecondsInvolved * 0.00083;
    setActualCost(actualCost);

    const userId = localStorage.getItem("id");
    const currentBalance = localStorage.getItem("balance");

    axios.post("http://localhost:4000/update-balance", {
      headers: { cost: actualCost, id: userId, balance: currentBalance },
    });
  }, []);
  return (
    <>
      <div className={MassDialerCSS.container}>
        <h3 style={{ color: "green", marginBottom: "1rem" }}>
          Successful Broadcast
        </h3>
        <p style={{ fontWeight: "bold" }}>Details:</p>
        <p>
          Total number of calls made:{" "}
          <span style={{ color: "red" }}>{length && length}</span>
        </p>
        <p>
          Duration of each individual call:{" "}
          <span style={{ color: "red" }}>{duration && duration} seconds</span>
        </p>
        <p>
          Total Duration of all calls:{" "}
          <span style={{ color: "red" }}>
            {totalSeconds & totalSeconds} seconds
          </span>
        </p>
        <p>
          Total Cost:{" "}
          <span style={{ color: "red" }}>${actualCost && actualCost}</span>
        </p>
      </div>
    </>
  );
};

export default MassDialerBill;
