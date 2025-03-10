import { StatusBar } from 'expo-status-bar';
import { NoteProvider } from './contexts/notesContext.js';
import AppNavigator from './navigation/AppNavigator';

import {useEffect} from 'react'
import { AuthProvider } from './contexts/authContext.js';
import { navigateAndKeepTheRoutes } from './navigation/navigationFunction.js';
import { ToolBarProvider } from './contexts/toolBarContext.js';
import { FolderMenuProvider } from './components/dashboard/HomeScreen/notesFolderComponents/hooks/useFolderContext.js';
export default function App() {

  return (

    
   <AuthProvider>
    <NoteProvider>
      <ToolBarProvider>
        <FolderMenuProvider>
     <AppNavigator/>
        </FolderMenuProvider>
      </ToolBarProvider>
   </NoteProvider>
   </AuthProvider>
   
)
}

