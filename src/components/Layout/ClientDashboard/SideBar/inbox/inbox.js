import React from "react";
import inboxCSS from "./inbox.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const isLoggedIn = localStorage.getItem("jwt");

const inbox = () => {
  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
  }, []);

  const [isloading, setIsLoading] = useState(false);
  const [receivedSms, setReceivedSms] = useState([]);

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const getMessages = async () => {
      //   setIsLoading(true);
      let result = await axios.get("http://localhost:4000/get-messages", {
        headers: {
          id: userId,
        },
      });
      setReceivedSms(result.data);
      //   console.log("result", result.data);
      //   console.log("ran", receivedSms);
      //   console.log(receivedSms.data);
      //   setIsLoading(false);
    };
    getMessages();
  }, []);

  {
    receivedSms && console.log(receivedSms);
  }

  return (
    <div className={inboxCSS.container}>
      <div>
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
    </div>
  );
};

export default inbox;
