import React from 'react'
import {ScrollView} from 'react-native'
import TitleInput from './elements/TitleInput'
import ContentInput from './elements/ContentInput'

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