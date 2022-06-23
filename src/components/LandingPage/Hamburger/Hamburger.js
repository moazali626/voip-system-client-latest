import React from "react";
import HamburgerCSS from "./Hamburger.module.scss";

const Hamburger = () => {
  return (
    <div className={`${HamburgerCSS.backdrop} ${HamburgerCSS["fadeIn"]}`}>
      <div className={HamburgerCSS.wrapper}>
        <div className={HamburgerCSS["menu-list"]}>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
