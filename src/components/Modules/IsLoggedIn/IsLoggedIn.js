import React, { useEffect } from "react";

const isUserLoggedIn = localStorage.getItem("jwt");

const IsLoggedIn = () => {
  if (!isUserLoggedIn) {
    console.log("test#4");
    window.location = "/unauthorized";
  }
  return <div>IsLoggedIn</div>;
};

export default IsLoggedIn;
