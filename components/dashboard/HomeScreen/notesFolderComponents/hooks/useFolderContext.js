import { createContext, useContext, useEffect, useState } from "react";
import { readFolders } from "../../../../../services/firestoreServices";
import { useAuthContext } from "../../../../../contexts/authContext";

const AddFolderMenuContext = createContext();

export const FolderMenuProvider = ({ children }) => {
  const [isAddFolderMenuVisible, setIsAddFolderMenuVisible] = useState(false);
  const [foldersList,setFoldersList] = useState([]);
  const [currentFolder,setCurrentFolder] = useState("all notes");
  const {account} =useAuthContext()
  useEffect(() => {
    console.log("Component mounted or account.uid changed");
    console.log('currently we are in ',currentFolder ,"folder")
    fetchFolders();
    
}, [account.uid,currentFolder]); // Jalankan fetchFolders saat account.uid berubah


const fetchFolders = async () => {
    console.log("Fetching folders...");
    const response = await readFolders(account.uid,currentFolder === "all notes"?null:currentFolder); 
    console.log(response);

    if (response.success) {
        console.log("Folder's tree path:", response.folders);
        updateFoldersList(response.folders);
    } else {
        console.error("Terjadi error saat menjalankan readFolders:", response.message);
    }
};

const updateFoldersList = (folders) => {
    // Cek apakah folders sudah ada di state sebelumnya
    console.log("updating folder list ........")
    console.log(folders)

    setFoldersList(prev => {
        const newFolders = folders.map(folder => ({
            folderId: folder.folderId,
            parentFolderId: folder.parentFolderId
        }));

        // Jika data sama, tidak perlu update state
        if (JSON.stringify(prev) === JSON.stringify(newFolders)) {
            return prev;
        }

        return newFolders;
    });
};

useEffect(()=>{
  console.log(foldersList)
},[foldersList])
  return (
    <AddFolderMenuContext.Provider value={{ isAddFolderMenuVisible, setIsAddFolderMenuVisible,setFoldersList,foldersList,setCurrentFolder,currentFolder }}>
      {children}
    </AddFolderMenuContext.Provider>
  );
};

export const useFolderMenuUtils = () => {
  return useContext(AddFolderMenuContext);
};
