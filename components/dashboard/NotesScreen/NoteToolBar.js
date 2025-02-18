import React from 'react'
import {View} from 'react-native'
import BackButton from './elements/BackButton'
import { Style } from '../../../styles/dashboard/notes/style'
function ToolBar() {
  return (
    <View style={Style.headerContainer}>
      {/* backbutton */}
      <BackButton/>
      </View> 
  )
}

export default ToolBar