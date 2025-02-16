import React, { createContext, useContext } from 'react';

// Buat Context
const NavigationContext = createContext();

// Buat Provider
export const NavigationProvider = ({ children, navigation }) => (
  <NavigationContext.Provider value={navigation}>
    {children}
  </NavigationContext.Provider>
);

// Hook untuk menggunakan Context
export const useNavigation = () => useContext(NavigationContext);
