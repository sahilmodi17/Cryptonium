import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [currency, setCurrency] = useState("inr");
  const [coins, setCoins] = useState([]);
  return (
    <UserContext.Provider value={{ currency, setCurrency, coins, setCoins }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
