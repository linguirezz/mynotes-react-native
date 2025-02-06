import {useState,useEffect} from 'react'
import { Text, View,TextInput,Image, TouchableOpacity,Button } from 'react-native';
import { getCurrentUser, signInUser } from '../../services/authServices';
import styles from '../../styles/styles';
import { navigateAndKeepTheRoutes, navigateAndResetAllRoutes } from '../../navigation/navigationFunction';
import { useAuthContext } from '../../contexts/authContext';


function LoginScreen({navigation}) {
  const [credential,setCredential]= useState({
    email:"",
    password:""
});
const {setAccount} = useAuthContext()
handleCredential= (key,value)=>{
    setCredential({...credential,[key]:value})
}
handleSubmit = async()=>{
    const {email,password} = credential

    console.log(`email : ${email} \n password:${password}`)
    try {            
      // sign in 
      const response = await signInUser(navigation,email,password);
      // set the auth global state
        const user =await getCurrentUser()
        console.log("user uid (loginScreen 22): ", user.uid)
        setAccount({
          uid: user.uid,
          isGuest:false
        })
        navigateAndResetAllRoutes(navigation,"home")
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