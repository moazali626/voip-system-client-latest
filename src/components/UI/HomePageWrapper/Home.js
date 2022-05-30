import React from "react";
import HeroBox from "../../LandingPage/HeroBox/HeroBox";
import { homeObjOne, homeObjTwo, homeObjThree } from "./Data";

const Home = () => {
  return (
    <>
      <HeroBox {...homeObjOne} />
      <HeroBox {...homeObjTwo} />
      <HeroBox {...homeObjThree} />
    </>
  );
};

export default Home;
