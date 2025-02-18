import React from 'react'
import {ScrollView} from 'react-native'

function NoteInput() {
  return (
      <ScrollView>
           {/* Title Input */}
            <TitleInput/>
           {/* Content Input */}
            <ContentInput/>
         </ScrollView>
  )
}

export default NoteInput