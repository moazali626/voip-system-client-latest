import React from "react";
import { usaPricing, ukPricing, canadaPricing } from "./PricingData";
import Pricing from "../../LandingPage/Pricing/Pricing";
import PricingWrapperCSS from "./PricingWrapper.module.scss";

const PricingWrapper = () => {
  console.log("pricing wrapper ran");
  return (
    <div className={PricingWrapperCSS.container}>
      <Pricing {...usaPricing} />
      <Pricing {...ukPricing} />
      <Pricing {...canadaPricing} />
    </div>
  );
};

export default PricingWrapper;
