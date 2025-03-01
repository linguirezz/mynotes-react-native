import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native'
import { Style } from '../../styles/dashboard/notes/style'
import { theme } from '../../styles/dashboard/theme'
import { editNotes, uploadsNote } from '../../services/firestoreServices'
import { useNoteContext } from '../../contexts/notesContext'
import { useAuthContext } from '../../contexts/authContext'
import { useNavigationUtils } from '../../navigation/navigationFunction'
import { NoteScreenComponents } from '../../utils/importUtils'
const {NoteInput,ToolBar}  = NoteScreenComponents

function NoteScreen() {
  return (
    
    <View style={Style.container}>
      {/* HEAD */}
      <ToolBar/> 
      {/* BODY */}
      <NoteInput/>
      {/* ScrollAble view */}
   
    </View>
  )
}

export default NoteScreen