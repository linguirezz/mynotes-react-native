import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native'
import { Style } from '../../styles/dashboard/notes/style'
import { theme } from '../../styles/dashboard/theme'
import { editNotes, uploadsNote } from '../../services/firestoreServices'
import { useNoteContext } from '../../contexts/notesContext'
import { useAuthContext } from '../../contexts/authContext'
import { useNavigationUtils } from '../../navigation/navigationFunction'

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

  // Handle save/update note
  const handleSave = async () => {
    try {
      const { title, content } = note
      if (currentNote) {
        // Update existing note
        // client
        setNotes(prevNotes => 
          prevNotes.map(note => 
            note.id === currentNote.id ? { ...note, title, content,isSelected:false } : note
          )
        )
        
        navigateAndResetAllRoutes("home")
        // server
        await editNotes(account.uid, currentNote.id, title, content)
      } else {
        // Create new note
        const tempId = `temp-${Math.random().toString(36).substr(2, 9)}`
        const newNote = { id: tempId, title, content, isSelected: false }
        
        // Optimistic UI update
        setNotes(prev => [...prev, newNote])
        navigateAndResetAllRoutes( "home")
        // Server update
        const uploadedNote = await uploadsNote(account.uid, title, content)
        
        // Update with real ID
        setNotes(prevNotes => 
          prevNotes.map(note => 
            note.id === tempId ? { ...note, id: uploadedNote.id } : note
          )
        )
      }
      
   
    } catch (error) {
      console.error("Error saving note:", error)
      // Rollback UI update if needed
    }
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
      <View style={Style.headerContainer}>
        <TouchableOpacity style={Style.headerBtn} onPress={handleSave}>
          <Text>{currentNote ? "Update" : "Save"}</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView>
        <TextInput
          value={note.title}
          onChangeText={text => handleNote("title", text)}
          style={Style.titleInput}
          placeholder="Write title..."
          placeholderTextColor={theme.colors.lowLightText}
          multiline
        />
        
        <TextInput
          value={note.content}
          onChangeText={text => handleNote("content", text)}
          style={Style.notesInput}
          placeholder="Write your notes here..."
          multiline
          textAlignVertical="top"
          placeholderTextColor={theme.colors.lowLightText}
        />
      </ScrollView>
    </View>
  )
}

export default NoteScreen