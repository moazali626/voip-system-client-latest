import React from "react";
import PricingCSS from "./Pricing.module.scss";

const Pricing = ({
  flag,
  country,
  plan,
  outgoingCallRate,
  incomingCallRate,
  outgoingSmsRate,
  incomingSmsRate,
  desc1,
  desc2,
  desc3,
  icon,
  alt,
}) => {
  return (
    <div className={PricingCSS.pricing} id="pricing">
      <div className={PricingCSS.box}>
        <img src={flag} alt={alt} className={PricingCSS.flag} />
        <h2>{country}</h2>
        <p>{plan}</p>
        <div className={PricingCSS.bullets}>
          <ul>
            <li>{outgoingCallRate}</li>
            <li>{incomingCallRate}</li>
            <li>{outgoingSmsRate}</li>
            <li>{incomingSmsRate}</li>
            <li>
              {desc1}
              <span className={PricingCSS.tick}>{icon}</span>
            </li>
            <li>
              {desc2}
              <span className={PricingCSS.tick}>{icon}</span>
            </li>
            <li>
              {desc3}
              <span className={PricingCSS.tick}>{icon}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
