import React from "react";
import "./App.scss";
import { Redirect } from "react-router";
import Signup from "./components/Pages/Signup/Signup";
import Welcome from "./components/Pages/Welcome/Welcome";
import NotFound from "./components/Pages/NotFound/NotFound";
import LandingPage from "./components/LandingPage/LandingPage";
import Disclaimer from "./components/Pages/Disclaimer";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import Contact from "./components/Pages/Contact";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClientDashboard from "./components/Layout/ClientDashboard/ClientDashboard";
import Login from "./components/Pages/Login/Login";
import Payment from "./components/Layout/ClientDashboard/SideBar/TopUp/Payment/Payment";
import TopUp from "./components/Layout/ClientDashboard/SideBar/TopUp/Amount/Amount";
import { TopUpProvider } from "./components/Layout/ClientDashboard/SideBar/TopUp/Context/TopUpContext";
import Unauthorized from "./components/Pages/Unauthorized/Unauthorized";
import AdminLogin from "./components/Pages/AdminLogin/AdminLogin";
import PaymentSuccess from "./components/Pages/PaymentSuccess/PaymentSuccess";
import PaymentFailed from "./components/Pages/PaymentFailed/PaymentFailed";
import BuyVirtualNumber from "./components/Layout/ClientDashboard/SideBar/BuyVirtualNumber/BuyVirtualNumber";
import Amount from "./components/Layout/ClientDashboard/SideBar/TopUp/Amount/Amount";
import EditProfile from "./components/Layout/ClientDashboard/SideBar/EditProfile/EditProfile";
import Billing from "./components/Layout/ClientDashboard/SideBar/TopUp/Billing/Billing";
import SendSMS from "./components/Layout/ClientDashboard/SideBar/SMS/SMS";
import Call from "./components/Layout/ClientDashboard/SideBar/Call/Call";
import MassDialer from "./components/Layout/ClientDashboard/SideBar/MassDialer/MassDialer";
import Documentation from "./components/Layout/ClientDashboard/SideBar/Documentation/Documentation";
import SupportCenter from "./components/Layout/ClientDashboard/SideBar/SupportCenter/SupportCenter";
import NumberPurchased from "./components/Pages/NumberPurchased/NumberPurchased";
import inbox from "./components/Layout/ClientDashboard/SideBar/inbox/inbox";
import Dummy from "./components/Pages/Dummy/Dummy";
import ConvertToMP3 from "./components/Modules/ConvertToMP3/ConvertToMP3";
import ReceiveCall from "./components/Modules/ReceiveCall/ReceiveCall";
import Dialer from "./components/Modules/MakeCall/public/dialer.jsx";
import PaymentCheck from "./components/Modules/PaymentCheck/PaymentCheck";
import MassDialerBill from "./components/Pages/MassDialerBill/MassDialerBill";
import AdminDashboard from "./components/AdminLayout/AdminDashboard";
import AddBalance from "./components/AdminLayout/SideBar/AddBalance/AddBalance";
import SuspendUser from "./components/AdminLayout/SideBar/SuspendUser/SuspendUser";
import ViewActivityUsage from "./components/AdminLayout/SideBar/ViewActivityUsage/ViewActivityUsage";
import IncomingSMSHistory from "./components/AdminLayout/Modules/IncomingSMSHistory/IncomingSMSHistory";
import OutgoingSMSHistory from "./components/AdminLayout/Modules/OutgoingSMSHistory/OutgoingSMSHistory";
import Broadcast from "./components/Modules/Broadcast/Broadcast";
import GetInboxMessages from "./components/AdminLayout/SideBar/GetInboxMessages/GetInboxMessages";

const App = () => {
  const isLoggedIn = localStorage.getItem("id");
  const isBalance = localStorage.getItem("balance");
  return (
    <>
      <TopUpProvider>
        <Router>
          {isLoggedIn && isBalance && <ClientDashboard />}
          {isLoggedIn && !isBalance && <AdminDashboard />}
          <Switch>
            <Route path="/payment-success" component={PaymentSuccess} />
            <Route path="/payment-failed" component={PaymentFailed} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/disclaimer" component={Disclaimer} />
            <Route path="/contact" component={Contact} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/client-dashboard" component={ClientDashboard} />
            <Route path="/buy-virtual-number" component={BuyVirtualNumber} />
            <Route path="/number-purchased" component={NumberPurchased} />
            <Route path="/amount" component={Amount} />
            <Route path="/edit-profile" component={EditProfile} />
            <Route path="/payment" component={Payment} />
            <Route path="/sms" component={SendSMS} />
            <Route path="/call" component={Call} />
            <Route path="/mass-dialer" component={MassDialer} />
            <Route path="/documentation" component={Documentation} />
            <Route path="/support-center" component={SupportCenter} />
            <Route path="/inbox" component={inbox} />
            <Route path="/admin-login" component={AdminLogin} />
            <Route path="/admin-dashboard" component={AdminDashboard} />
            <Route path="/add-balance" component={AddBalance} />
            <Route path="/suspend-user" component={SuspendUser} />
            <Route path="/view-activity-usage" component={ViewActivityUsage} />
            <Route path="/get-inbox-messages" component={GetInboxMessages} />
            <Route
              path="/incoming-sms-history"
              component={IncomingSMSHistory}
            />
            <Route
              path="/outgoing-sms-history"
              component={OutgoingSMSHistory}
            />
            <Route path="/receive-a-call" exact component={ReceiveCall} />
            <Route path="/make-call" exact component={Dialer} />
            <Route path="/convert-to-mp3" component={ConvertToMP3} />
            <Route path="/broadcast" component={Broadcast} />
            <Route path="/payment-check" component={PaymentCheck} />
            <Route path="/unauthorized" component={Unauthorized} />
            <Route path="/mass-dialer-bill" component={MassDialerBill} />
            <Route exact component={LandingPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </TopUpProvider>
    </>
  );
};

export default App;
