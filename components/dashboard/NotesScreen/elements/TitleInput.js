import React from 'react'
import { TextInput } from 'react-native'
function TitleInput() {
  return (
    <>
           <TextInput
              value={note.title}
              onChangeText={text => handleNote("title", text)}
              style={Style.titleInput}
              placeholder="Write title..."
              placeholderTextColor={theme.colors.lowLightText}
              multiline
            />
    </>
   
  )
}

export default TitleInput