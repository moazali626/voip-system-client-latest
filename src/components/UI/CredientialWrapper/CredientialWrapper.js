import React from "react";
import WrapperCSS from "./CredientialWrapper.module.scss";

const CredientialWrapper = (props) => {
  return (
    <div className={WrapperCSS["wrapper-component"]}>
      <div className={WrapperCSS["wrapper-box"]}>
        <div className={WrapperCSS["image-banner"]}>
          {/* Image URL is inside CSS */}
        </div>
        <div className={WrapperCSS["wrapper-information"]}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default CredientialWrapper;
