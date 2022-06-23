import React, { useState, useEffect } from "react";
import GetInboxMessagesCSS from "./GetInboxMessages.module.scss";
import axios from "axios";

const GetInboxMessages = () => {
  const [receivedSms, setReceivedSms] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      let result = await axios.get(
        "http://localhost:4000/get-inbox-messages",
        {}
      );
      setReceivedSms(result.data);
      console.log(result.data);
    };
    getMessages();
  }, []);

  {
    receivedSms && console.log(receivedSms);
  }

  return (
    <div
      className={GetInboxMessagesCSS.container}
      style={{
        overflow: "scroll",
        height: "300px",
        width: "1100px",
        overflow: "auto",
      }}
    >
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Message</th>
        </tr>

        {receivedSms &&
          receivedSms.map((item) => {
            let { name, email, message } = item;
            return (
              <tr>
                <th>{name}</th>
                <th>{email}</th>
                <th>{message}</th>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default GetInboxMessages;
