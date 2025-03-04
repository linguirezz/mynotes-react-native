import { createContext, useContext, useState } from "react";

const AddFolderMenuContext = createContext();

export const FolderMenuProvider = ({ children }) => {
  const [isAddFolderMenuVisible, setIsAddFolderMenuVisible] = useState(false);
  
  return (
    <AddFolderMenuContext.Provider value={{ isAddFolderMenuVisible, setIsAddFolderMenuVisible }}>
      {children}
    </AddFolderMenuContext.Provider>
  );
};

export const useFolderMenuUtils = () => {
  return useContext(AddFolderMenuContext);
};
