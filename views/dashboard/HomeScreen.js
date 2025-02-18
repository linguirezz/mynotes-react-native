import React, { useEffect,useRef,useState } from 'react'
import { View,Text,Button, TouchableOpacity, Vibration ,Modal, Dimensions} from 'react-native'
import { signInAsGuestAccount, signOutUser } from '../../services/authServices'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Style from '../../styles/dashboard/home/style'
import {theme} from '../../styles/dashboard/theme'
import { uploadsNote,getNotes,editNotes,deleteNote } from '../../services/firestoreServices'
import { NoteProvider, useNoteContext } from '../../contexts/notesContext'
import { useAuthContext } from '../../contexts/authContext'
import Header from '../../components/dashboard/Header';
import { useToolBar } from '../../contexts/toolBarContext';
import NotesGroup from '../../components/dashboard/NotesGroup';
import { useNavigationUtils } from '../../navigation/navigationFunction';
import { Checkbox } from 'react-native-paper'
import SearchBar from '../../components/dashboard/SearchBar'
import AddButton from '../../components/dashboard/elements/AddButton'
import LowerToolBar from '../../components/dashboard/elements/LowerToolBar'
import UpperToolBar from '../../components/dashboard/elements/UpperToolBar'

function HomeScreen() {
  const {toolBar}=useToolBar();
  return (
<View  style={Style.container}>
          
       <ScrollView style={Style.scrollView}  >
        {/* HEAD */}
       {
        !toolBar.isVisible ?
        // header (not in select mode)
        <Header />
      :
      // menu in select mode (edit menu header)
       <UpperToolBar/>
       } 
       {/* BODY */}
        <View style={[{paddingHorizontal:30}]}>
        {/* search bar */}
         <SearchBar/> 
        {/* notes group section */}
         <NotesGroup/>
        </View>
    </ScrollView>
    {/* TAIL */}
    {
      toolBar.isVisible ?
      // edit menu
      <LowerToolBar/> 
      // add button 
       :
    <AddButton/>
    }
        </View>
  )
}

export default HomeScreen
 