import React from "react";
import HeroBoxCSS from "./HeroBox.module.scss";
import { Link } from "react-router-dom";

const HeroBox = ({
  lightBg,
  topLine,
  headline,
  description,
  buttonlabel,
  buttonLink,
  img,
  alt,
  imgStart,
  id,
}) => {
  console.log(description);
  return (
    <>
      <div
        className={
          lightBg
            ? `${HeroBoxCSS["home__hero-section"]}`
            : `${HeroBoxCSS["home__hero-section"]} ${HeroBoxCSS.darkBg} `
        }
        id={id}
      >
        <div
          className={HeroBoxCSS.container}
          style={{
            display: "flex",
            flexDirection: imgStart === "start" ? "row-reverse" : "row",
          }}
        >
          <div className={HeroBoxCSS["left-div"]}>
            <div
              className={
                imgStart
                  ? HeroBoxCSS["home__hero-text-wrapper-reverse"]
                  : HeroBoxCSS["home__hero-text-wrapper"]
              }
            >
              <div className={HeroBoxCSS["top-line"]}>{topLine}</div>
              <h1 className={HeroBoxCSS.heading}>{headline}</h1>
              <p className={HeroBoxCSS.description}>{description}</p>
              <Link to={buttonLink}>
                <button className={HeroBoxCSS["btn-get-started"]}>
                  {buttonlabel}
                </button>
              </Link>
            </div>
          </div>

          <div className={HeroBoxCSS["right-div"]}>
            <div className={HeroBoxCSS["home__hero-img-wrapper"]}>
              <img
                src={img}
                alt={alt}
                className={
                  imgStart === "start"
                    ? HeroBoxCSS["home__hero-img-reverse"]
                    : HeroBoxCSS["home__hero-img"]
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBox;
