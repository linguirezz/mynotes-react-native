import {useState,useEffect} from 'react'
import { Text, View,TextInput,Image, TouchableOpacity,Button } from 'react-native';
import styles from '../../styles/styles';
import { createUser } from '../../services/authServices';
import { ScrollView } from 'react-native-gesture-handler';
import { navigateAndResetAllRoutes } from '../../navigation/navigationFunction';
function RegisterScreen({navigation}) {
    const [credential,setCredential]= useState({
        username:"",
        email:"",
        password:""
    });
    handleCredential= (key,value)=>{
        setCredential({...credential,[key]:value})
    }
    handleSubmit = async ()=>{
        const {username,email,password} = credential
        console.log(`email : ${email} \n password:${password}`)
        try {            
          await  createUser(navigation,email,password)
            console.log("success to registing user , try to check if the user is listed in firebase")
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=>{   
        console.log(`credential typed: ${JSON.stringify(credential)} `) ;
    },[credential])
  return (
    <ScrollView>

    <View style={styles.container}>
    {/* header */}
    <Text style={styles.HeaderStyle}>Create your account first !</Text>

       {/*sub header  */}
    <Text numberOfLines={2} style={styles.SubHeaderStyle} >Sign in to your account to get of various access</Text>{/** h2 */}
       {/*input username  */}
       <View style={styles.InputContainer}>
     <Image source={require("../../assets/favicon.png")} style={{width:25, height :25, alignSelf:"center" , marginRight:10}}/>
     <TextInput  placeholder="create your username"  placeholderTextColor="#B0C4DE" style={{width:"100%"}} onChangeText={(text)=>handleCredential("username",text)}/>
    </View>
       {/* input email */}
    <View style={styles.InputContainer}>
     <Image source={require("../../assets/favicon.png")} style={{width:25, height :25, alignSelf:"center" , marginRight:10}}/>
     <TextInput placeholder="Enter your email" placeholderTextColor="#B0C4DE" style={{width:"100%"} }  onChangeText={(text)=>handleCredential("email",text)}/>
    </View>
       {/* input password */}
    <View style={styles.InputContainer}>
     <Image source={require("../../assets/favicon.png")} style={{width:25 ,alignSelf:"center", height :25  , marginRight:10 }}/>
     <TextInput placeholder="password" secureTextEntry={true} placeholderTextColor="#B0C4DE" style={{width:"100%"}} onChangeText={(text)=>handleCredential("password",text)}/>
    </View>
       {/* forgot password text */}
    <TouchableOpacity>
     <Text>Forgot Password</Text>
    </TouchableOpacity>
    {/* submit button */}
    <Button title='Log In' onPress={()=>{
      console.log('log in Button Clicked')
        handleSubmit()
      }}/>
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
     Already have an account ?
   </Text>
   <Button title='Sign Up' onPress={()=>{
     navigateAndResetAllRoutes(navigation,"login")
    }}/>
   </View> 
    </ScrollView>
  )
}

export default RegisterScreen