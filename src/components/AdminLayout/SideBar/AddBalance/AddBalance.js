import React, { useState, useEffect } from "react";
import AddBalanceCSS from "./AddBalance.module.scss";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

let result;

// const isLoggedIn = localStorage.getItem("jwt");
const isBalanceAttribute = localStorage.getItem("balance");

const AddBalance = () => {
  useEffect(() => {
    // if (!isLoggedIn) {
    //   window.location = "/unauthorized";
    // }
    if (isBalanceAttribute) {
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
  }, []);
  const [allUsers, setAllUsers] = useState([]);
  const [amount, setAmount] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      result = await axios.get("http://localhost:4000/get-all-users");
      setAllUsers(result.data);
    };
    getAllUsers();
  }, []);

  const amountHandler = (e) => {
    console.log(e.target.value);
    setAmount(e.target.value);
  };

  const addBalanceHandler = async (id) => {
    console.log("add balance handler ran");
    await axios.post("http://localhost:4000/add-balance-manually", {
      headers: {
        id: id,
        amount: amount,
      },
    });
  };
  return (
    <div className={AddBalanceCSS.container}>
      <table>
        <tr>
          {/* <th>User ID</th> */}
          <th>Name</th>
          <th>Email</th>
          <th>Associated Phone</th>
          <th>Balance</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>

        {allUsers &&
          allUsers.map((item) => {
            let { _id, name, email, phone, balance } = item;
            return (
              <tr>
                {/* <th>{_id}</th> */}
                <th>{name}</th>
                <th>{email}</th>
                <th>+1{phone}</th>
                <th>${balance}</th>
                <th>
                  <TextField
                    id="outlined-number"
                    label="Amount in $"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={amountHandler}
                  />
                </th>
                <th>
                  <Button
                    variant="contained"
                    style={{ color: "white", backgroundColor: "#e62828" }}
                    onClick={() => {
                      addBalanceHandler(_id), window.location.reload();
                    }}
                  >
                    SET BALANCE
                  </Button>
                </th>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default AddBalance;
