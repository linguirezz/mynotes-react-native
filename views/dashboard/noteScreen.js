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
  const [note, setNote] = useState({ title: "", content: "" })
  const [currentNote, setCurrentNote] = useState(null)
  const { notes, setNotes } = useNoteContext()
  const { account } = useAuthContext()
  const {navigateAndResetAllRoutes,navigateAndKeepTheRoutes} =useNavigationUtils();

  // Handle input changes
  const handleNote = (key, value) => {
    setNote(prev => ({ ...prev, [key]: value }))
  }
  // Track selected note
  useEffect(() => {
    const selected = notes.find(note => note.isSelected)
    console.log("is there any selected (noteScreen : 68) :",selected)
    if (selected) {
      setCurrentNote(selected)
      setNote({ title: selected.title, content: selected.content })
    } else {
      setCurrentNote(null)
      setNote({ title: "", content: "" })
    }
  }, [notes])

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