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
      let result = await axios.get("http://localhost:4000/get-messages", {
        headers: {
          id: userId,
        },
      });
      setReceivedSms(result.data);
    };
    getMessages();
  }, []);

  {
    receivedSms && console.log(receivedSms);
  }

  return (
    <>
      {receivedSms.length <= 0 ? (
        <h1
          style={{
            position: "relative",
            textAlign: "center",
            top: "-380px",
            left: "670px",
            border: "2px solid black",
            display: "inline",
            padding: "1rem 2rem",
          }}
        >
          Inbox is empty
        </h1>
      ) : (
        <div
          className={inboxCSS.container}
          style={{
            overflow: "scroll",
            height: "320px",
            width: "1100px",
            overflow: "auto",
          }}
        >
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
      )}
    </>
  );
};

export default inbox;
