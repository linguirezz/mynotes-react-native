import React from 'react'
import {TouchableOpacity,Text} from "react-native"
import styles from '../../../styles/dashboard/home/style'
import { useNavigationUtils } from '../../../navigation/navigationFunction'

function AddButton() {
  const {navigateAndKeepTheRoutes}=useNavigationUtils()
  return (
     <TouchableOpacity style={styles.addButton} onPress={()=>{ navigateAndKeepTheRoutes("note") }}>
       <Text style={styles.addButtonContent}></Text>
     </TouchableOpacity>
  )
}

export default AddButton