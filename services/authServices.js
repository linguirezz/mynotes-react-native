import app from "../firebase.js"
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useAuthRequest } from 'expo-auth-session';
import * as Constants from 'expo-constants';
import { useEffect } from "react";
// import {GOOGLE_EXPO_WEB_CLIENT_ID} from "@env"
import { createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword,
    reload,
    signInAnonymously,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
    GoogleAuthProvider
    
 } from "firebase/auth"
import { navigateAndResetAllRoutes } from "../navigation/navigationFunction.js";
const auth = getAuth(app)
async function signInUser(navigation,email,password){
  try { 
      const response = await signInWithEmailAndPassword(auth,email,password);
      return response
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
  

 function getCurrentUser(){
          
        const user = auth.currentUser || null
        if(user){
          console.log("curren User (authService : 67) :" ,user)
        return user
        }
        else{
          console.log("tidak ada current user (auth service : 81)")
        }
        
  
}
async function refreshEmailVerifiedStatus(){
  try {
    const user =  auth.currentUser
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
    console.log("email has been sended")
  } catch (error) {
    console.error("ada kesalahan pada fungsi sendEmailVerification")
    console.error(error)
  }  
}
// signOutUser
async function signOutUser(){
    try { 
         await signOut(auth);
          console.log("user has been succed to signOut !!!!")          
    } catch (error) {
      console.error("ada kesalahan pada fungsi signOutUser")
      console.error(error)
    }
  }
// reset email
async function resetEmail(email){
  try {
    if(email){
      console.log("resesting the email... (authContext : 118)")
    const response = await  sendPasswordResetEmail(auth,email)
    
    console.log("succes to send password reset to ",email,"(authContext : 120)")
    return true
    }
    else{
      console.error("email is not found (authProvider : 126)")
      return null
    }
    
  } catch (error) {
    console.error("ada kesalahan pada fungsi sendPasswordResetEmail");
    console.error(error)    
  }

}
// confirm reset password
async function confirmResetPassword(verifCode,newPassword){
  try {
    if (verifCode && newPassword){
      console.log("confirming reset password");
      await confirmPasswordReset(auth,verifCode,newPassword)  
      console.log( console.log("succes to confirm user password (authContext : 120)"))
    }
    else{
      console.error("some parameter is not found (authProvider : 142)")
    }
  } catch (error) {
    console.error("ada kesalahan pada fungsi confirmResetPassword");
    console.error(error)   
  }  
}

export {createUser,
  signInUser,
  sendEmailVerifyNotification,
  refreshEmailVerifiedStatus,
  signOutUser,
  getCurrentUser,
  signInAsGuestAccount,
  resetEmail,
  confirmResetPassword,

}