import React, { useEffect } from "react";
import ViewActivityUsageCSS from "./ViewActivityUsage.module.scss";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const isBalanceAttribute = localStorage.getItem("name");

const ViewActivityUsage = () => {
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
  }, []);
  return (
    <div className={ViewActivityUsageCSS.container}>
      <div className={ViewActivityUsageCSS.incoming}>
        <Link to="incoming-sms-history" style={{ textDecoration: "none" }}>
          <Button
            style={{
              color: "#1876D1",
              fontSize: "1rem",
            }}
            variant="outlined"
          >
            INCOMING SMS HISTORY
          </Button>
        </Link>
      </div>
      <div className={ViewActivityUsageCSS.outging}>
        <Link to="/outgoing-sms-history" style={{ textDecoration: "none" }}>
          <Button
            style={{ color: "#1876D1", fontSize: "1rem", marginTop: "1rem" }}
            variant="outlined"
          >
            OUTGOING SMS HISTORY
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ViewActivityUsage;
