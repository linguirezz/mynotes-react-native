import React from 'react'
import { TextInput } from 'react-native'
import { useNoteContext } from '../../../../contexts/notesContext'
import { Style } from '../../../../styles/dashboard/notes/style';
import { theme } from '../../../../styles/dashboard/theme';
function TitleInput() {
  const {setNote,note} = useNoteContext();
   // Handle input changes
   const handleTitle = ( value) => {
     setNote(prev => ({ ...prev, ["title"]: value }))
   } 
  return (
    <>
           <TextInput
              value={note.title}
              onChangeText={text => handleTitle(text)}
              style={Style.titleInput}
              placeholder="Write title..."
              placeholderTextColor={theme.colors.lowLightText}
              multiline
            />
    </>
   
  )
}

export default TitleInput