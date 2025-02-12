import { createContext, useContext, useEffect, useState } from "react";

import { signInAsGuestAccount } from "../services/authServices";
import { getData, storeData } from "../services/asyncStorage";
// Membuat context
const AuthContext = createContext();

// Membuat provider
export  function AuthProvider({ children }) {
   
    const [account, setAccount] = useState({
        uid: "",
        isGuest:true
    });
    const creatingGuestAccountIfUserIsAGuest = async ()=>{
        console.log("auth provider running (authContext : 16)")
    
            // mengecek apakah user mempunyai akun atau belum
       const accountInAsyncStorage = await getData("account")
       console.log("akun yang tersimpan pada asyncStorage",accountInAsyncStorage)
       if(accountInAsyncStorage && accountInAsyncStorage.uid ){
            // jika akun ada
            console.log("akun ditemukan !! (authCotenxt : 23)")
            
            setAccount(prevAccount => ({ ...prevAccount, ...accountInAsyncStorage }));

       }
       else{
           // jika akun tidak ditemukan
           console.log("membuat akun guest untuk user")
           try {
             signInAsGuestAccount()
            .then(response=>{
                console.log("")
               console.log("sign in sebagai tamu berhasil dengan respon berikut: ",response);
               const responsWithSomeFormat = {
                uid:response.uid,
                isGuest:true
               }
               setAccount(responsWithSomeFormat);
               storeData("account",account);
           })
           .catch(error=>console.error(error))
        } catch (error) {
            console.error("there is some errors on auth provider");
            console.error(error);
        }
       }
      
    }
   useEffect(()=>{
    creatingGuestAccountIfUserIsAGuest()
},[])
    // checking the account state
   
    useEffect(()=>{
       console.log("current account :",account)
    },[account])
   
    return (
        <AuthContext.Provider value={{ account, setAccount }}>
            {children}
        </AuthContext.Provider>
    );
}

// Membuat custom hook untuk menggunakan context
export function useAuthContext() {
    return useContext(AuthContext);
}