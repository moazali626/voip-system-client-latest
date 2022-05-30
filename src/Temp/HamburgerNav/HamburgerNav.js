import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import HamburgerNavCSS from "./HamburgerNav.module.scss";
import { Link } from "react-router-dom";
import { HamburgerNavData } from "./HamburgerNavData";
import CloseIcon from "@material-ui/icons/Close";

const HamburgerNav = () => {
  const [showMenu, setShowMenu] = useState(false);

  const showMenuHandler = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className={HamburgerNavCSS.container}>
        {!showMenu && (
          <MenuIcon style={{ fontSize: 50 }} onClick={showMenuHandler} />
        )}
        {showMenu && (
          <CloseIcon style={{ fontSize: 50 }} onClick={showMenuHandler} />
        )}
        {}
        <div
          className={
            HamburgerNavCSS[showMenu ? "hamburger-active" : "hamburger-nav"]
          }
        >
          <ul
            className={HamburgerNavCSS["nav-links"]}
            onClick={showMenuHandler}
          >
            {HamburgerNavData.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.link} style={{ textDecoration: "none" }}>
                    <div className={HamburgerNavCSS.icon}>{item.icon}</div>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HamburgerNav;
