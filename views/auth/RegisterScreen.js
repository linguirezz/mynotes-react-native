import {useState,useEffect} from 'react'
import { Text, View,TextInput,Image, TouchableOpacity,Button } from 'react-native';
import styles from '../../styles/styles';
import { createUser,getCurrentUser,sendEmailVerifyNotification } from '../../services/authServices';
import { ScrollView } from 'react-native-gesture-handler';
import { navigateAndKeepTheRoutes, navigateAndResetAllRoutes } from '../../navigation/navigationFunction';
import { useAuthContext } from '../../contexts/authContext';
function RegisterScreen({navigation}) {  
  const [credential,setCredential]= useState({
        username:"",
        email:"",
        password:""
    });
    // auth context
    const {setAccount} = useAuthContext()
    handleCredential= (key,value)=>{
        setCredential({...credential,[key]:value})
    }
    handleSubmit = async()=>{
      const {email,password} = credential
  
      console.log(`email : ${email} \n password:${password}`)
      try {            
        // create user and register 
        const response = await createUser(navigation,email,password);
        
        const user = getCurrentUser();
        // verify the user
        if(user){
          if(!user.emailVerified){
            console.log("user's email is not verified ,sending user to verify screen (LoginScreen : 29)");
            console.log("sending you to the verify screen (registerScree : 33)")
            await sendEmailVerifyNotification();
            navigateAndKeepTheRoutes(navigation,"verify")
          }
          // set the auth global state
             setAccount({
              uid: user.uid,
              isGuest:false
            })
  
            
        }
        else{
          console.log("user is not found (RegisterScreen : 43)")
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
      <ScrollView >
    {/* header */}
    <Text style={[styles.HeaderStyle,{textAlign:"left"}]}>Create your account first !</Text>

       {/*sub header  */}
    <Text numberOfLines={2} style={[styles.secondaryText,{marginBottom:40}]} >Sign in to your account to get of various access</Text>{/** h2 */}
       {/*input username  */}
       <View style={styles.InputContainer}>
     <Image source={require("../../assets/favicon.png")} style={{width:25, height :25, alignSelf:"center" , marginRight:10}}/>
     <TextInput  placeholder="create your username"  placeholderTextColor="#B0C4DE" style={styles.textInput} onChangeText={(text)=>handleCredential("username",text)}/>
    </View>
       {/* input email */}
    <View style={styles.InputContainer}>
     <Image source={require("../../assets/favicon.png")} style={{width:25, height :25, alignSelf:"center" , marginRight:10}}/>
     <TextInput placeholder="Enter your email" placeholderTextColor="#B0C4DE" style={styles.textInput }  onChangeText={(text)=>handleCredential("email",text)}/>
    </View>
       {/* input password */}
    <View style={styles.InputContainer}>
     <Image source={require("../../assets/favicon.png")} style={{width:25 ,alignSelf:"center", height :25  , marginRight:10 }}/>
     <TextInput placeholder="password" secureTextEntry={true} placeholderTextColor="#B0C4DE" style={styles.textInput} onChangeText={(text)=>handleCredential("password",text)}/>
    </View>
        {/* forgot password text */}
        <TouchableOpacity onPress={()=>{navigateAndKeepTheRoutes(navigation,"recovery-email")}} >
    <Text style={[styles.anchorText,{fontSize:13,marginBottom:5,marginLeft:"auto"}]}>Forgot Password</Text>
    </TouchableOpacity >
    {/* submit button */}
    <TouchableOpacity  style={styles.submitBtn} title='Log In' onPress={()=>{handleSubmit()}}>
        <Text style={styles.submitBtnText}> Sign Up </Text>
      </TouchableOpacity>
    {/* or element */}
    <View>
     <View></View>
     <Text style={[styles.secondaryText,{marginVertical:20}]}>or </Text>
     <View></View>
   </View>
   {/* other login option buttons group */}
   <View>
     <TouchableOpacity style={styles.googleBtn} onPress={()=>{alert("login with google is under development,please wait for the next update")}}>
       {/* <Image source={require("../../assets/favicon.png")}/> */}
       <Text style={{fontSize:17,fontWeight:"600"}}>Login With Google</Text>
     </TouchableOpacity>
     {/* <TouchableOpacity >
       <Image source={require("../../assets/favicon.png")}/>
       <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>facebook</Text>
     </TouchableOpacity> */}
   </View>
  {/* suggest if client has no account */}
   <Text>
     Already have an account ?
   </Text>
   {/* call to action if user forget his password */}
   <View style={[{marginTop:"auto",marginBottom:40,flexDirection:"row",justifyContent:"center"}]}>
    <Text style={[styles.secondaryText]}> do you already login ? </Text>
   <TouchableOpacity  onPress={()=>{navigateAndResetAllRoutes(navigation,"login")}}> 
    <Text style={styles.anchorText}>login</Text> 
    </TouchableOpacity> 
   </View>


      </ScrollView>
   </View> 
  
  )
}

export default RegisterScreen