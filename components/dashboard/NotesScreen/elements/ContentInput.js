import React from 'react'
import {TextInput} from 'react-native'
function ContentInput() {
  return (
   <>
           <TextInput
          value={note.content}
          onChangeText={text => handleNote("content", text)}
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