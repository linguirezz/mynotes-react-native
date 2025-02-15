import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import LoginScreen from '../views/auth/LoginScreen.js'
import RegisterScreen from '../views/auth/RegisterScreen';
import VerifyScreen from "../views/auth/VerifyScreen.js";
import HomeScreen from "../views/dashboard/HomeScreen.js";
import NoteScreen from "../views/dashboard/noteScreen.js";
import TestScreen from "../views/testScreen.js";
import { theme } from "../styles/dashboard/theme.js";
import ResetPasswordScreen from "../views/auth/ResetPasswordScreen.js";
import RecoveryEmailScreen from "../views/auth/RecoveryEmailScreen.js";
import SettingsScreen from "../views/settings/SettingsScreen.js";
import ProfileScreen from "../views/dashboard/ProfileScreen.js";
function AppNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator >
       
          {/* dashboard */}
     
          <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="settings" component={SettingsScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="profile" component={ProfileScreen} options={{ headerShown: false }}/>
             {/* <Stack.Screen name="test" component={TestScreen} options={{ headerShown: false }}/> */}
         
            <Stack.Screen name="note" component={NoteScreen} options={{ headerShown: false }}/>
            {/* auth */}
          <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }}/>{/** warning!!!!! ubah kembali menjadi login screeen */}
            <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="verify" component={VerifyScreen} options={{
             headerStyle:{
              backgroundColor:theme.colors.background
              
             },
             headerTintColor: '#ffffff', // Warna tombol kembali dan teks header
             headerTitleStyle: {
               color: '#ffffff', // Warna teks title
               fontWeight: '600', // Gaya teks title
               
             },
             title:"Back"
              }}/>
            <Stack.Screen name="recovery-email" component={RecoveryEmailScreen} options={{
             headerStyle:{
              backgroundColor:theme.colors.background
              
             },
             headerTintColor: '#ffffff', // Warna tombol kembali dan teks header
             headerTitleStyle: {
               color: '#ffffff', // Warna teks title
               fontWeight: '600', // Gaya teks title
               
             },
             title:"Back"
              }} />
                   <Stack.Screen name="reset-pass" component={ResetPasswordScreen} options={{
             headerStyle:{
              backgroundColor:theme.colors.background
              
             },
             headerTintColor: '#ffffff', // Warna tombol kembali dan teks header
             headerTitleStyle: {
               color: '#ffffff', // Warna teks title
               fontWeight: '600', // Gaya teks title
               
             },
             title:"Back"
              }}/>
           
            
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
