import { StatusBar } from 'expo-status-bar';
import { NoteProvider } from './contexts/notesContext.js';
import AppNavigator from './navigation/AppNavigator';
import {getCurrentUser} from './services/authServices.js'
import {useEffect} from 'react'
export default function App() {
 useEffect(()=>{
  getCurrentUser()
 },[])
  return (
   <NoteProvider>
     <AppNavigator/>
   </NoteProvider>
)
}

