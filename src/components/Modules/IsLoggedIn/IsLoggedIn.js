import React, { useEffect } from "react";

console.log("test#2");

const isUserLoggedIn = localStorage.getItem("jwt");

console.log("test#3");

const IsLoggedIn = () => {
  console.log("test#4");
  console.log("isLoggedIn function ran");
  if (!isUserLoggedIn) {
    console.log("test#4");
    window.location = "/unauthorized";
  }
  return <div>IsLoggedIn</div>;
};

export default IsLoggedIn;
