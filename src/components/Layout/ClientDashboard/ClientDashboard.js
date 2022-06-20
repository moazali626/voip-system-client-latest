import React, { useState, useContext, useEffect } from "react";
import ClientDashboardCSS from "./ClientDashboard.module.scss";
import Logo from "../../../images/client-dashboard-logo.png";
import Avatar from "../../../images/user-avatar.png";
import SelectedListItem from "../../UI/SideBarMenu/SideBarMenu";
import Divider from "@material-ui/core/Divider";
import TopUp from "../../Layout/ClientDashboard/SideBar/TopUp/TopUp";
import EditProfile from "../../Layout/ClientDashboard/SideBar/EditProfile/EditProfile";
import SMS from "../../Layout/ClientDashboard/SideBar/SMS/SMS";
import Call from "../../Layout/ClientDashboard/SideBar/Call/Call";
import MassDialer from "../../Layout/ClientDashboard/SideBar/MassDialer/MassDialer";
import Documentation from "../../Layout/ClientDashboard/SideBar/Documentation/Documentation";
import SupportCenter from "../../Layout/ClientDashboard/SideBar/SupportCenter/SupportCenter";
import MenuListComposition from "./Logout/Logout";
import { TopUpContext } from "./SideBar/TopUp/Context/TopUpContext";
import axios from "axios";
import Unauthorized from "../../Pages/Unauthorized/Unauthorized";
// import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import SmsIcon from "@mui/icons-material/Sms";

import { Link } from "react-router-dom";

import { Redirect } from "react-router-dom";
import SmsAlert from "../../UI/SmsAlert/SmsAlert";
import { id } from "date-fns/locale";
import ReceiveCall from "../../Modules/ReceiveCall/ReceiveCall";
// import CallMenu from "../../Modules/CallMenu/CallMenu";

const userId = localStorage.getItem("id");

let isFound;

const ClientDashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { selected, amount } = useContext(TopUpContext);
  // const [selectedTopUpItem, setSelectedTopUpItem] = selected;
  // const [topUpAmount, setTopUpAmount] = amount;
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isRequestCompleted, setIsRequestCompleted] = useState(false);

  // const [profileInfo, setProfileInfo] = useContext(ProfileContext);
  // console.log(profileInfo);

  useEffect(() => {
    const isSuspended = async () => {
      isFound = await axios.post("http://localhost:4000/check-suspended", {
        headers: {
          id: userId,
        },
      });
      // console.log("isFound client", isFound.data._id);
      if (!isFound.data._id) {
        localStorage.removeItem("name");
        localStorage.removeItem("balance");
        localStorage.removeItem("jwt");
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        localStorage.removeItem("number");
        localStorage.removeItem("phone");

        window.location = "/";
      }
    };

    const updatedBalance = async () => {
      // console.log("updated", userId);
      const user = await axios.post("http://localhost:4000/get-profile", {
        headers: {
          id: userId,
        },
      });

      const balance = localStorage.getItem("balance");

      if (user.data.balance != balance) {
        localStorage.removeItem("balance");
        localStorage.setItem("balance", user.data.balance);
      }
    };

    const isAuth = async () => {
      const localJWT = localStorage.getItem("jwt");

      const data = await axios.post("http://localhost:4000/dashboard", {
        headers: {
          Authorization: `Bearer ${localJWT}`,
        },
      });
      if (data.data.auth == true) {
        setIsAuthorized(true);
      }
      setIsRequestCompleted(true);
    };
    updatedBalance();
    isSuspended();
    isAuth();
  }, []);

  const name = localStorage.getItem("name");
  const balance = localStorage.getItem("balance");
  const phoneNumber = localStorage.getItem("phone");

  return (
    <>
      {isAuthorized && (
        <div className={ClientDashboardCSS.container}>
          <div className={ClientDashboardCSS.sidebar}>
            <div className={ClientDashboardCSS.logo}>
              <Link to="/inbox">
                <img src={Logo} alt="logo" />
              </Link>
            </div>
            <Divider />
            <div className={ClientDashboardCSS["profile-information"]}>
              <img src={Avatar} alt="avatar" />

              <h3>{name}</h3>
              <p>
                Balance: <b>${balance}</b>
              </p>
            </div>
            <Divider />
            <SelectedListItem
              selectedIndexInfo={selectedIndex}
              setSelectedIndexInfo={setSelectedIndex}
            />
            <MenuListComposition />
          </div>
          <div className={ClientDashboardCSS.phone}>
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
          {selectedIndex == -2 && <Redirect to="/inbox"></Redirect>}
          {selectedIndex == -1 && (
            <Redirect to="/buy-virtual-number"></Redirect>
          )}
          {selectedIndex == 0 && <Redirect to="/amount"></Redirect>}
          {selectedIndex == 1 && <Redirect to="/edit-profile"></Redirect>}
          {selectedIndex == 2 && <Redirect to="/sms"></Redirect>}
          {selectedIndex == 2.5 && <Redirect to="/make-call"></Redirect>}
          {selectedIndex == 3 && <Redirect to="/call"></Redirect>}
          {selectedIndex == 4 && <Redirect to="/mass-dialer"></Redirect>}
          {selectedIndex == 4.5 && <Redirect to="/receive-a-call"></Redirect>}
          {selectedIndex == 5 && <Redirect to="/documentation"></Redirect>}
          {selectedIndex == 6 && <Redirect to="/support-center"></Redirect>}
        </div>
      )}
      {/* {!isAuthorized && isRequestCompleted && <Unauthorized />} */}
    </>
  );
};

export default ClientDashboard;
