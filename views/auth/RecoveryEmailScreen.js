import { View,Text,TouchableOpacity,TextInput,Image } from "react-native"
import styles from "../../styles/styles"
import { useState,useEffect } from "react"
import { resetEmail } from "../../services/authServices";
import { navigateAndKeepTheRoutes } from "../../navigation/navigationFunction";
// todo ada beberapa code yang perlu dirapikan dan direfactor
function RecoveryEmailScreen({navigation}) {
 const [recoveryEmail,setRecoveryEmail]=useState("");
//  action for the confirm button
 async function handleForgotPassWord(){

   console.log("forgot password button clicked ! (loginScreen : 57)");
   navigateAndKeepTheRoutes(navigation,"reset-pass");
    const response = await resetEmail(recoveryEmail) ;
    
  
    if(response){
      console.log("sending you to reset password page");
    }
    else{
      console.log("respon gagal (recoveryEmailScreen : 66)")
    }
  } 
  useEffect(()=>{
    console.log("recovery email (EnterEmailScreen : 20):",recoveryEmail)
  },[recoveryEmail])
    return (
      <View style={styles.container}>
      <Text style={[styles.HeaderStyle,{textAlign:"center",fontSize:26,marginTop:100}]} >Enter Your email</Text>  
      <Text style={[styles.secondaryText]}>we will need your email first for resetting your password</Text>
      <View style={[styles.InputContainer,{marginVertical:20}]}>
      <Image source={require("../../assets/favicon.png")} style={{width:25, height :25, alignSelf:"center" , marginRight:10}}/>  
      <TextInput placeholder="Enter your email" placeholderTextColor={"#B0C4DE"} style={[styles.textInput]} onChangeText={(text)=>{setRecoveryEmail(text)}}/>
      </View>
      <TouchableOpacity  style={styles.submitBtn} title='Log In' onPress={handleForgotPassWord}>
        <Text style={styles.submitBtnText}> Confirm </Text>
      </TouchableOpacity>
      
      </View>
    )
  }
  
  export default RecoveryEmailScreen