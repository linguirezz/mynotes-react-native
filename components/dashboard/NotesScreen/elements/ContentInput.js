import React from 'react'
import {TextInput} from 'react-native'
import { Style } from '../../../../styles/dashboard/notes/style';
import { theme } from '../../../../styles/dashboard/theme';
import useNotesScreenUtils from '../hook/useNotesScreenUtils';
import { useNoteContext } from '../../../../contexts/notesContext';
function ContentInput() {
  const {handleContent}= useNotesScreenUtils();
  const {note} = useNoteContext();
  
  return (
   <>
           <TextInput
          value={note.content}
          onChangeText={text => handleContent(text)}
          style={Style.notesInput}
          placeholder="Write your notes here..."
          multiline
          textAlignVertical="top"
          placeholderTextColor={theme.colors.lowLightText}
        />
   </>
  )
}

export default ContentInput