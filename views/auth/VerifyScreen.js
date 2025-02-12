import React, { useState } from 'react'
import {View,Text,Button,TouchableOpacity,Dimensions} from'react-native'
import {  getCurrentUser, refreshEmailVerifiedStatus, sendEmailVerifyNotification } from '../../services/authServices'
import { navigateAndResetAllRoutes } from '../../navigation/navigationFunction'
import styles from '../../styles/styles'
import { useAuthContext } from '../../contexts/authContext'

function VerifyScreen({navigation}) {
  console.log("verify button is clicked!")
  const [isVerify,setIsVerify]= useState()
  // auth context
  const {setAccount}=useAuthContext()
  // get the width of the window 
  const{height} =Dimensions.get("window")
  // logic to confirm user verify
  const handleVerify= async ()=>{
    console.log("verify button is clicked !")
    const isVerified = await refreshEmailVerifiedStatus()
    const user =  getCurrentUser()
    console.log(user)
    console.log("is verified (verifyScreen :21):",isVerified)
    if(isVerified === false ){
      alert("you're still not verified yet")
    } 
    else{
      console.log("verified navigate to home")
      navigateAndResetAllRoutes(navigation,"home")
      
     // set the auth global state
     setAccount({
      uid: user.uid,
      isGuest:false
    })
    }
  }
  // if user still dont get the verification
  const handleSendVerification= async()=>{
    await sendEmailVerifyNotification()
  }
  return (
    <View style={[styles.container]}>
      <Text style={[styles.HeaderStyle,{textAlign:"center",fontSize:26,marginTop:100}]} > Check Your Phone</Text>
      <Text>please check your email and clicked the link</Text>
      <TouchableOpacity  style={[styles.submitBtn,{marginBottom:20}]} onPress={handleSendVerification}>
        <Text style={styles.submitBtnText}> Send Again </Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.submitBtn} onPress={handleVerify}>
        <Text style={styles.submitBtnText}> verify </Text>
      </TouchableOpacity>
    
      
    </View>

  )
}

export default VerifyScreen