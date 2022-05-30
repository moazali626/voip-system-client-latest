import React, { useState, useEffect } from "react";
import IncomingSMSHistoryCSS from "./IncomingSMSHistory.module.scss";
import axios from "axios";

const IncomingSMSHistory = () => {
  const [receivedSms, setReceivedSms] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      let result = await axios.get(
        "http://localhost:4000/get-incoming-sms-history",
        {}
      );
      setReceivedSms(result.data);
    };
    getMessages();
  }, []);

  {
    receivedSms && console.log(receivedSms);
  }

  return (
    <div className={IncomingSMSHistoryCSS.container}>
      <table>
        <tr>
          <th>To</th>
          <th>From</th>
          <th>Message</th>
          <th>Date & Time</th>
        </tr>

        {receivedSms &&
          receivedSms.map((item) => {
            let { to, from, body, date } = item;
            return (
              <tr>
                <th>{to}</th>
                <th>{from}</th>
                <th>{body}</th>
                <th>{date}</th>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default IncomingSMSHistory;
