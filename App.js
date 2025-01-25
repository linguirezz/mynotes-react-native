import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
import {getCurrentUser} from './services/authServices.js'
import {useEffect} from 'react'
export default function App() {
 useEffect(()=>{
  getCurrentUser()
 },[])
  return <AppNavigator/>
}

