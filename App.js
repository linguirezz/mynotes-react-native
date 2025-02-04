import { StatusBar } from 'expo-status-bar';
import { NoteProvider } from './contexts/notesContext.js';
import AppNavigator from './navigation/AppNavigator';
import {getCurrentUser} from './services/authServices.js'
import {useEffect} from 'react'
import { AuthProvider } from './contexts/authContext.js';
export default function App() {
 useEffect(()=>{
  getCurrentUser()
 },[])
  return (
   <AuthProvider>
    <NoteProvider>
     <AppNavigator/>
   </NoteProvider>
   </AuthProvider>
   
)
}

