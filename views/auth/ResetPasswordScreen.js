import React from 'react'
import {TouchableOpacity, Text, View } from 'react-native'
import styles from '../../styles/styles'
import { navigateAndResetAllRoutes } from '../../navigation/navigationFunction'
function ResetPasswordScreen({navigation}) {
    // function handlePassword = () =>{

    // }
  return (
    <View style={styles.container}>
    <Text style={[styles.HeaderStyle,{textAlign:"center",fontSize:26,marginTop:100}]} >Reset Your Password</Text>  
    <Text style={[styles.secondaryText,{marginBottom:40}]}>Please press the link we have sent to your email and change your password</Text>
    <TouchableOpacity  style={styles.submitBtn} title='Log In' onPress={()=>navigateAndResetAllRoutes(navigation,"login")}>
        <Text style={styles.submitBtnText}> i've change the password </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ResetPasswordScreen