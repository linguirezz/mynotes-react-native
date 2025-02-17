import React, {useState, createContext, useContext } from 'react';

// Buat Context
const ToolBarContext = createContext();

// Buat Provider
export function ToolBarProvider ({ children, navigation }) {
      const [toolBar,setToolBar] = useState(
        {
         isVisible : false
        }
      )
    
    return (
        <ToolBarContext.Provider value={{toolBar,setToolBar}}>
          {children}
       </ToolBarContext.Provider>
    )
  
};

// Hook untuk menggunakan Context
export const useToolBar = () => useContext(ToolBarContext);
