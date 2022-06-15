import React, { createContext, useState } from "react";

export const TopUpContext = createContext();

export const TopUpProvider = (props) => {
  const [selectedTopUpItem, setSelectedTopUpItem] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState();

  return (
    <TopUpContext.Provider
      value={{
        selected: [selectedTopUpItem, setSelectedTopUpItem],
        amount: [topUpAmount, setTopUpAmount],
      }}
    >
      {props.children}
    </TopUpContext.Provider>
  );
};
