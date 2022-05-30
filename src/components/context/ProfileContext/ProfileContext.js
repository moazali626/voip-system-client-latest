import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    balance: "",
  });
  return (
    <ProfileContext.Provider value={[profileInfo, setProfileInfo]}>
      {props.children}
    </ProfileContext.Provider>
  );
};
