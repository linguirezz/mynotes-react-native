import React from 'react'
import {Text,TouchableOpacity} from 'react-native'
import { Style } from '../../../../styles/dashboard/notes/style'
import useNotesScreenUtils from '../hook/useNotesScreenUtils'
import { useNoteContext } from '../../../../contexts/notesContext'

function BackButton() {
  const {handleSave} = useNotesScreenUtils();
  const {currentNote} = useNoteContext();
  return (
     <TouchableOpacity style={Style.headerBtn} onPress={handleSave}>
       <Text>{currentNote ? "Update" : "Save"}</Text>
     </TouchableOpacity>
  )
}

export default BackButton