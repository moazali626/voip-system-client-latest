import React, { useEffect } from "react";
import DocumentationCSS from "./Documentation.module.scss";

const isLoggedIn = localStorage.getItem("jwt");

const Documentation = () => {
  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
  }, []);

  return (
    <div className={DocumentationCSS.container}>
      <h1>Documentation</h1>
    </div>
  );
};

export default Documentation;
