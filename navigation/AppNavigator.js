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
function AppNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator >
          {/* dashboard */}

             <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }}/>
             <Stack.Screen name="test" component={TestScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="note" component={NoteScreen} options={{ headerShown: false }}/>
            {/* auth */}
            <Stack.Screen name="login" component={LoginScreen} />{/** warning!!!!! ubah kembali menjadi login screeen */}
            <Stack.Screen name="register" component={RegisterScreen}/>
            <Stack.Screen name="verify" component={VerifyScreen}/>
            
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
