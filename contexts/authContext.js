import { createContext, useContext, useState } from "react";

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
    const checkIfAccountExist = async ()=>{
        console.log("hey hey")
        try {
            // mengecek apakah user mempunyai akun atau belum
       const accountInAsyncStorage = await getData("account")
       console.log("akun yang tersimpan pada asyncStorage",accountInAsyncStorage)
       if(accountInAsyncStorage["uid"] === null ){
            // jika akun ada
           console.log("account ditemukan !" , account)
           setAccount(accountInAsyncStorage);
       }
       else{
           // jika akun tidak ditemukan
           console.log("membuat akun guest untuk user")
            signInAsGuestAccount()
            .then(response=>{
               console.log("sign in sebagai tamu berhasil dengan respon berikut: ",response);
               const responsWithSomeFormat = {
                uid:response.uid,
                isGuest:true
               }
               setAccount(responsWithSomeFormat);
               storeData("account",account);
           })
       }
       } catch (error) {
           console.error("there is some errors on auth provider");
           console.error(error);
       }
    }
    // checking the account state
    useState(()=>{
       console.log(account)
    },[account])
    useState(()=>{},[account])
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