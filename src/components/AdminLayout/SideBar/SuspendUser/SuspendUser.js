import React, { useState, useEffect } from "react";
import SuspendUserCSS from "./SuspendUser.module.scss";
import axios from "axios";
import Button from "@material-ui/core/Button";

let result;

const userId = localStorage.getItem("id");

const isBalanceAttribute = localStorage.getItem("name");

const SuspendUser = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (isBalanceAttribute != "Admin") {
      localStorage.removeItem("jwt");
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("topup");
      localStorage.removeItem("justOnce");
      localStorage.removeItem("phone");
      localStorage.removeItem("balance");
      window.location = "/unauthorized";
    }

    if (!isBalanceAttribute) {
      window.location = "/unauthorized";
    }

    const getAllUsers = async () => {
      result = await axios.get("http://localhost:4000/get-all-users");
      setAllUsers(result.data);
    };
    getAllUsers();
  }, []);

  const suspendHandler = async (id) => {
    // e.preventDefault();
    console.log("suspend handler ran");
    console.log(id);
    // console.log(e.props);
    //deleting record from database
    const result = await axios.post("http://localhost:4000/suspend-user", {
      headers: {
        userId: id,
      },
    });

    //logging out user
    const localJWT = localStorage.getItem("jwt");
    await axios.post("http://localhost:4000/client-logout", {
      headers: {
        Authorization: `Bearer ${localJWT}`,
      },
    });

    // localStorage.removeItem("name");
    // localStorage.removeItem("balance");
    // localStorage.removeItem("jwt");
    // localStorage.removeItem("id");
    // localStorage.removeItem("email");
    // localStorage.removeItem("number");
    // localStorage.removeItem("phone");

    // window.location = "/";
  };

  return (
    <div className={SuspendUserCSS.container}>
      <table>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Associated Phone</th>
          <th>Balance</th>
          <th>Action</th>
        </tr>

        {allUsers &&
          allUsers.map((item) => {
            let { _id, name, email, phone, balance } = item;
            return (
              <tr>
                <th>{_id}</th>
                <th>{name}</th>
                <th>{email}</th>
                <th>+1{phone}</th>
                <th>${balance}</th>
                <th>
                  <Button
                    variant="contained"
                    style={{ color: "white", backgroundColor: "#e62828" }}
                    onClick={() => {
                      suspendHandler(_id), window.location.reload();
                    }}
                  >
                    Suspend
                  </Button>
                </th>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default SuspendUser;
