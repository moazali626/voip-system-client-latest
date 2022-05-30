import React from "react";
import Navbar from "./Navbar/Navbar";
import HomePageWrapper from "../UI/HomePageWrapper/Home";
import Contact from "./Contact/Contact";
import Footer from "../LandingPage/Footer/Footer";
import PricingWrapper from "../UI/PricingWrapper/PricingWrapper";

const isLoggedIn = localStorage.getItem("id");

const LandingPage = () => {
  return (
    <>
      {/* {!isLoggedIn ? ( */}
      <div>
        <Navbar />
        <HomePageWrapper />
        <PricingWrapper />
        <Contact />
        <Footer />
      </div>
      {/* ) : (
        <p></p>
      )} */}
    </>
  );
};

export default LandingPage;
