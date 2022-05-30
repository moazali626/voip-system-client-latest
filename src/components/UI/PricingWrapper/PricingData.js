import PricingCSS from "../../UI/PricingWrapper/PricingWrapper.module.scss";
import USAImg from "../../../images/united-states.svg";
import UKImg from "../../../images/united-kingdom.svg";
import CanadaImg from "../../../images/canada.svg";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export const usaPricing = {
  flag: USAImg,
  country: "USA",
  plan: "Pay-as-you-go",
  outgoingCallRate: "Outgoing Call: $0.0130/min",
  incomingCallRate: "Incoming Call: $0.0085min",
  outgoingSmsRate: "Outgoing SMS: $0.0075/sms",
  incomingSmsRate: "Incoming SMS: $0.0075/sms",
  desc1: "Easily Schedule Call/SMS",
  desc2: "Free Customer Support ",
  desc3: "Mass Automatic Dialer ",
  icon: <CheckCircleIcon className={PricingCSS.tick} />,
  alt: "usa flag",
};

export const ukPricing = {
  flag: UKImg,
  country: "UK",
  plan: "Pay-as-you-go",
  outgoingCallRate: "Outgoing Call: $0.0150/minn",
  incomingCallRate: "Incoming Call: $0.0100/min",
  outgoingSmsRate: "Outgoing SMS: $0.0400/sms",
  incomingSmsRate: "Incoming SMS: $0.0075/sms",
  desc1: "Easily Schedule Call/SMS",
  desc2: "Free Customer Support ",
  desc3: "Mass Automatic Dialer ",
  icon: <CheckCircleIcon className={PricingCSS.tick} />,
  alt: "uk flag",
};

export const canadaPricing = {
  flag: CanadaImg,
  country: "Canada",
  plan: "Pay-as-you-go",
  outgoingCallRate: "Outgoing Call: $0.0130/min",
  incomingCallRate: "Incoming Call: $0.0085/min",
  outgoingSmsRate: "Outgoing SMS: $0.0075/sms",
  incomingSmsRate: "Incoming SMS: $0.0075/sms",
  desc1: "Easily Schedule Call/SMS",
  desc2: "Free Customer Support ",
  desc3: "Mass Automatic Dialer ",
  icon: <CheckCircleIcon className={PricingCSS.tick} />,
  alt: "canada flag",
};
