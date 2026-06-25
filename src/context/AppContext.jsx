import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    companyName: "Green Valley Veg Market",
    address: "123 Market Road, Chennai, Tamil Nadu",
    commission: 10,
    language: 'en' // en, ta, hi
  });

  return (
    <AppContext.Provider value={{ settings, setSettings }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);