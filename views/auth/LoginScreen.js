import {useState,useEffect} from 'react'
import { Text, View,TextInput,Image, TouchableOpacity,Button } from 'react-native';
import { signInUser } from '../../services/authServices';
import styles from '../../styles/styles';
import { navigateAndKeepTheRoutes, navigateAndResetAllRoutes } from '../../navigation/navigationFunction';


function LoginScreen({navigation}) {
  const [credential,setCredential]= useState({
    email:"",
    password:""
});
handleCredential= (key,value)=>{
    setCredential({...credential,[key]:value})
}
handleSubmit = ()=>{
    const {email,password} = credential
    console.log(`email : ${email} \n password:${password}`)
    try {            
        const response = signInUser(navigation,email,password);
        console.log(response)
        if(response){
          
          console.log("user succes to logged in reload the app to se the change");
        
        }
        
      } catch (error) {
        console.error(error)
    }
}
useEffect(()=>{   
    console.log(`credential typed: ${JSON.stringify(credential)} `) ;
},[credential])
  return (
    <View style={styles.container}>
    {/* header */}
    <Text style={styles.HeaderStyle}>Let's start!</Text>

       {/*sub header  */}
    <Text numberOfLines={2} style={styles.SubHeaderStyle} >Sign in to your account to get of various access</Text>{/** h2 */}
       {/* input email */}
    <View style={styles.InputContainer}>
     <Image source={require("../../assets/favicon.png")} style={{width:25, height :25, alignSelf:"center" , marginRight:10}}/>
     <TextInput placeholder="Enter your email" placeholderTextColor="#B0C4DE" style={{width:"100%"}} onChangeText={(text)=>{handleCredential("email",text)}}/>
    </View>
       {/* input password */}
    <View style={styles.InputContainer}>
     <Image source={require("../../assets/favicon.png")} style={{width:25 ,alignSelf:"center", height :25  , marginRight:10 }}/>
     <TextInput placeholder="password" secureTextEntry={true} placeholderTextColor="#B0C4DE" style={{width:"100%"}} onChangeText={(text)=>{handleCredential("password",text)}}/>
    </View>
       {/* forgot password text */}
    <TouchableOpacity>
     <Text>Forgot Password</Text>
    </TouchableOpacity>
    {/* submit button */}
    <Button title='Log In' onPress={()=>{handleSubmit()}}/>
    {/* or element */}
   <View>
     <View></View>
     <Text>or login with</Text>
     <View></View>
   </View>
   {/* other login option buttons group */}
   <View>
     <TouchableOpacity >
       <Image source={require("../../assets/favicon.png")}/>
       <Text>facebook</Text>
     </TouchableOpacity>
     <TouchableOpacity >
       <Image source={require("../../assets/favicon.png")}/>
       <Text>google</Text>
     </TouchableOpacity>
   </View>
  {/* suggest if client has no account */}
   <Text>
     Dont have an account ?
   </Text>
   <Button title='Sign Up' onPress={()=>{
      navigateAndResetAllRoutes(navigation,"register")
   }}/>
   </View> 
  )
}

export default LoginScreen