import React, { useEffect } from "react";
import FAQ from "./FAQ/FAQ";
import ContactBtn from "./Phone/ContactBtn";
import SupportCenterCSS from "./SupportCenter.module.scss";

const isLoggedIn = localStorage.getItem("jwt");

const SupportCenter = () => {
  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
  }, []);
  return (
    <div className={SupportCenterCSS.container}>
      {/* <ContactBtn /> */}
      <FAQ />
    </div>
  );
};

export default SupportCenter;
