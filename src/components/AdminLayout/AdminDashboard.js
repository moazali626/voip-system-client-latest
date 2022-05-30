import React, { useEffect, useState } from "react";
import AdminDashboardCSS from "./AdminDashboard.module.scss";
import axios from "axios";
import Unauthorized from "../Pages/Unauthorized/Unauthorized";
import { Link, Redirect } from "react-router-dom";

import Logo from "../../images/client-dashboard-logo.png";
import Avatar from "../../images/user-avatar.png";
import SelectedListItem from "../../components/UI/AdminSideBarMenu/AdminSideBarMenu";
import Divider from "@material-ui/core/Divider";

//issue duplicate code
import MenuListComposition from "../Layout/ClientDashboard/Logout/Logout";

const AdminDashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isRequestCompleted, setIsRequestCompleted] = useState(false);

  useEffect(() => {
    const isAuth = async () => {
      const localJWT = localStorage.getItem("jwt");

      const data = await axios.post("http://localhost:4000/admin-dashboard", {
        headers: {
          Authorization: `Bearer ${localJWT}`,
        },
      });
      if (data.data.auth == true) {
        setIsAuthorized(true);
      }
      setIsRequestCompleted(true);
    };

    isAuth();
  }, []);

  const name = localStorage.getItem("name");
  const phoneNumber = localStorage.getItem("phone");

  return (
    <>
      {isAuthorized && (
        <div className={AdminDashboardCSS.container}>
          <div className={AdminDashboardCSS.sidebar}>
            <div className={AdminDashboardCSS.logo}>
              <Link to="/">
                <img src={Logo} alt="logo" />
              </Link>
            </div>
            <Divider />
            <div className={AdminDashboardCSS["profile-information"]}>
              <img src={Avatar} alt="avatar" />

              <h3>{name}</h3>
            </div>
            <Divider />
            <SelectedListItem
              selectedIndexInfo={selectedIndex}
              setSelectedIndexInfo={setSelectedIndex}
            />
            <MenuListComposition />
          </div>
          <div className={AdminDashboardCSS.phone}>
            {phoneNumber != 0 && phoneNumber && (
              <p
                style={{
                  border: "1px dotted black",
                  padding: "0.2rem 0.4rem",
                }}
              >
                <p
                  style={{
                    color: "red",
                    display: "inline",
                  }}
                >
                  Active Number:
                </p>
                {" +1 (" + phoneNumber + ")"}
              </p>
            )}
          </div>
          {/* <div>
            <SmsAlert />
          </div> */}
          {selectedIndex == 0 && <Redirect to="/add-balance"></Redirect>}
          {selectedIndex == 1 && <Redirect to="/suspend-user"></Redirect>}
          {selectedIndex == 2 && (
            <Redirect to="/view-activity-usage"></Redirect>
          )}
        </div>
      )}
      {/* {!isAuthorized && isRequestCompleted && <Unauthorized />} */}
    </>
  );
};

export default AdminDashboard;
