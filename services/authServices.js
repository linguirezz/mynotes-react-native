import app from "../firebase.js"
import { createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword,
    reload,
    signInAnonymously
    
 } from "firebase/auth"
import { navigateAndResetAllRoutes } from "../navigation/navigationFunction.js";
const auth = getAuth(app)
async function signInUser(navigation,email,password){
  try { 
      const response = await signInWithEmailAndPassword(auth,email,password);
      const isVerified = response.isVerified
    if(response){
        console.log("user has been succed to signIn !!!!")
        console.log("with response : ",response)
        console.log("navigating to verify route ....")
        if(isVerified){
          console.log("navigating to verify screen ....")
          navigateAndResetAllRoutes(navigation,"verify")
        }
        else{
          console.log("navigating to home screen ....")
          navigateAndResetAllRoutes(navigation,"home")
        }
        
      }
  } catch (error) {
    console.error("ada kesalahan di fungsi signin user!!!")
    console.error(error)
  }
}
async function signInAsGuestAccount(){
try {
  const response = await signInAnonymously(auth);
  const user = response.user;
  const userUID = user.uid;
  return {uid : userUID ,user}
} catch (error) {
  console.error("ada kesalahan di fungsi signInAsGuestAccount user!!!")
    console.error(error)
}
  
}
// createUser
async function createUser(navigation,email,password){
    try { 
      console.log(email);
      console.log(password)
        const response = await createUserWithEmailAndPassword(auth,email,password);
        const user = response.user
        const isVerified = user.isVerified
        
      if(response){
          console.log("user has been succed to register !!!!")
            console.log("with response : ",response);
            console.log("navigating to verify route ....");
            if(!isVerified){
              console.log("navigating to verify screen ....")
              navigateAndResetAllRoutes(navigation,"verify")
            }
            else{
              console.log("navigating to home screen ....")
              navigateAndResetAllRoutes(navigation,"home")
            }
    
      }
    } catch (error) {
      console.error("ada kesalahan di fungsi createUser!!!")
      console.error(error)
    }
  }
  

async function getCurrentUser(){
    try {        
        const user = auth.currentUser
        console.log(`current user ${JSON.stringify(user)}`)
        return user
    } catch (error) {
        console.error("terdapat error di fungsi getCurrentUser")
        console.error(error)
    }
}
async function refreshEmailVerifiedStatus(){
  try {
    const user = auth.currentUser
    if(user){
     await user.reload()
      console.log("user ditemukan!!")
      const isVerified = user.emailVerified
      return isVerified
    }
    else{
      console.error("user tidak ditemukan !!")
      throw new Error("user null !")
    }
  } catch (error) {
    console.error("ada kesalahan di fungsi refreshEmaill!!!")
    console.error(error)
  }

}
//  sendEmailVerifyNotification
async function sendEmailVerifyNotification(){
  try {
    const user = auth.currentUser
    await sendEmailVerification(user)
  } catch (error) {
    console.error("ada kesalahan pada fungsi sendEmailVerification")
    console.error(error)
  }  
}
// signOutUser
async function signOutUser(navigation,email,password){
    try { 
         await signOut();
          console.log("user has been succed to signOut !!!!")          
      
    } catch (error) {
      console.error("ada kesalahan pada fungsi signOutUser")
      console.error(error)
    }
  }

  export {createUser,signInUser,sendEmailVerifyNotification,refreshEmailVerifiedStatus,signOutUser,getCurrentUser,signInAsGuestAccount}