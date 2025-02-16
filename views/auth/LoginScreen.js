import {useState,useEffect} from 'react'
import { Text, View,TextInput,Image, TouchableOpacity,Button } from 'react-native';
import { getCurrentUser, resetEmail, signInUser,sendEmailVerifyNotification } from '../../services/authServices';
import styles from '../../styles/styles';
import {useNavigationUtils} from '../../navigation/navigationFunction';
import { useAuthContext } from '../../contexts/authContext';
import { Style } from '../../styles/dashboard/notes/style';
import { theme } from '../../styles/dashboard/theme';


function LoginScreen({navigation})  {
  const [credential,setCredential]= useState({
    email:"",
    password:""
});

const {setAccount} = useAuthContext()
const { navigateAndKeepTheRoutes, navigateAndResetAllRoutes } = useNavigationUtils();


handleCredential= (key,value)=>{
    setCredential({...credential,[key]:value})
}
handleSubmit = async()=>{
    const {email,password} = credential
    if (!password.trim()) {
      alert('Password tidak boleh kosong!');
      return;
    }
    console.log(`email : ${email} \n password:${password}`)
    try {            
      // sign in 
      const response = await signInUser(email,password);
      console.log("response (loginScreen :27) :", response)
      // checking if user succes to login first
      if(response){ 
        const user = getCurrentUser()
        // verify the user
        if(user){
          console.log("isVerified (loginScreen : 32): ",user.emailVerified)
          if(!user.emailVerified){
            console.log("user's email is not verified ,sending user to verify screen (LoginScreen : 29)");
            await sendEmailVerifyNotification();
            console.log("sending you to the verify screen (loginScreen : 37)")
            navigateAndKeepTheRoutes("verify")
          }
          // set the auth global state
            console.log("user uid (loginScreen 22): ", user.uid)
            setAccount({
              uid: user.uid,
              isGuest:false
            })
            navigateAndResetAllRoutes("home")
        }
        else{
          console.log("user is not found (loginScreen : 47)")
        }
       
      }
     
      } catch (error) {
        console.error(error)
    }
}

const handleGoogleLogin = async ()=>{
// fix thisssss 
    
   
   
  
 
}

useEffect(()=>{   
    console.log(`credential typed: ${JSON.stringify(credential)} `) ;
},[credential])
  return (
    <View style={styles.container}>
    {/* header */}
    <Text style={styles.HeaderStyle}>Let's start!</Text>

       {/*sub header  */}
    <Text numberOfLines={2} style={[styles.secondaryText,{marginBottom:40}]} >Sign in to your account to get of various access</Text>{/** h2 */}
       {/* input email */}
    <View style={styles.InputContainer}>
     <Image source={require("../../assets/favicon.png")} style={{width:25, height :25, alignSelf:"center" , marginRight:10}}/>
     <TextInput placeholder="Enter your email" placeholderTextColor={"#B0C4DE"} style={styles.textInput} onChangeText={(text)=>{handleCredential("email",text)}}/>
    </View>
       {/* input password */}
    <View style={styles.InputContainer}>
     <Image source={require("../../assets/favicon.png")} style={{width:25 ,alignSelf:"center", height :25  , marginRight:10 }}/>
     <TextInput  placeholder="password" autoCapitalize="none" autoCorrect={false} secureTextEntry={true} placeholderTextColor="#B0C4DE" style={styles.textInput} onChangeText={(text)=>{handleCredential("password",text)}}/>
    </View>
       {/* forgot password text */}
    <TouchableOpacity onPress={()=>{navigateAndKeepTheRoutes("recovery-email")}} >
    <Text style={[styles.anchorText,{fontSize:13,marginBottom:5,marginLeft:"auto"}]}>Forgot Password</Text>
    </TouchableOpacity >
    {/* login button */}
    <TouchableOpacity  style={styles.submitBtn} title='Log In' onPress={()=>{handleSubmit()}}>
        <Text style={styles.submitBtnText}> Log In </Text>
      </TouchableOpacity>
    {/* or element */}
   <View>
     <View></View>
     <Text style={[styles.secondaryText,{marginVertical:20}]}>or </Text>
     <View></View>
   </View>
   {/* other login option buttons group */}
   <View>
     <TouchableOpacity style={styles.googleBtn} onPress={()=>{alert("login with google is under development,please wait for the next update ")}}>
       {/* <Image source={require("../../assets/favicon.png")}/> */}
       <Text style={{fontSize:17,fontWeight:"600"}}>Login With Google</Text>
     </TouchableOpacity>
     {/* <TouchableOpacity >
       <Image source={require("../../assets/favicon.png")}/>
       <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>facebook</Text>
     </TouchableOpacity> */}
   </View>
  {/* suggest if client has no account */}
      
   {/* <Text style={[styles.secondaryText,{marginTop:"auto"}]}>
     Dont have an account ? 
   </Text> */}
   <View style={[{marginTop:"auto",marginBottom:40,flexDirection:"row",justifyContent:"center"}]}>
    <Text style={[styles.secondaryText]}> don't you have an account ? </Text>
   <TouchableOpacity  onPress={()=>{navigateAndResetAllRoutes("register")}}> 
    <Text style={styles.anchorText}>register</Text> 
    </TouchableOpacity> 
   </View>
   
   </View> 
  )
}

export default LoginScreen