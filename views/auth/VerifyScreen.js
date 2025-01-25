import React, { useState } from 'react'
import {View,Text,Button} from'react-native'
import {  refreshEmailVerifiedStatus, sendEmailVerifyNotification } from '../../services/authServices'
import { navigateAndResetAllRoutes } from '../../navigation/navigationFunction'
function VerifyScreen({navigation}) {
  console.log("verify button is clicked!")
  const [isVerify,setIsVerify]= useState()
  const handleVerify= async ()=>{
    console.log("verify button is clicked !")
    const isVerified = await refreshEmailVerifiedStatus()
    console.log(isVerified)
    if(isVerified === false ){
     navigateAndResetAllRoutes(navigation,"login")
    } 
    else{
      navigateAndResetAllRoutes(navigation,"home")
    }
  }
  const handleSendVerification= async()=>{
    await sendEmailVerifyNotification()
  }
  return (
    <View>
        <Text>email has sent !</Text>
        <Text>please check your email and clicked the link</Text>
        <Button title="send verification" onPress={handleSendVerification}/>
        <Button title="verify" onPress={handleVerify}/>
    </View>

  )
}

export default VerifyScreen