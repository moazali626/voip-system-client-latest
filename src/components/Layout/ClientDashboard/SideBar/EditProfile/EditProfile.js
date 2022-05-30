import React, { useEffect } from "react";
import EditProfileCSS from "./EditProfile.module.scss";
import ProfileInformation from "./ProfileInformation/ProfileInformation";

const isLoggedIn = localStorage.getItem("jwt");

const EditProfile = () => {
  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
  }, []);

  return (
    <div className={EditProfileCSS.container}>
      <ProfileInformation />
    </div>
  );
};

export default EditProfile;
