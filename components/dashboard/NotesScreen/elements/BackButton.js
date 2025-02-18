import React from 'react'
import {View,Text} from 'react-native'
import { Style } from '../../../../styles/dashboard/notes/style'
function BackButton() {
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
  return (
     <TouchableOpacity style={Style.headerBtn} onPress={handleSave}>
       <Text>{currentNote ? "Update" : "Save"}</Text>
     </TouchableOpacity>
  )
}

export default BackButton