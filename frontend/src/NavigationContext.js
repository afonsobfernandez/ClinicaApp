import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [navigationHistory, setNavigationHistory] = useState([]);
  const location = useLocation();

  // Automatically track route changes
  useEffect(() => {
    setNavigationHistory(prev => [...prev, location.pathname]);
  }, [location]);

  const getPreviousPath = () => {
    return navigationHistory[navigationHistory.length - 2] || '/';
  };

  return (
    <NavigationContext.Provider value={{ navigationHistory, getPreviousPath }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);