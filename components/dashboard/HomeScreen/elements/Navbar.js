import React from 'react'
import {TouchableOpacity,Text,View} from "react-native"
import styles from '../../../../styles/dashboard/home/style'
import { useNavigationUtils } from '../../../../navigation/navigationFunction'
import { theme } from '../../../../styles/dashboard/theme'

function NavBar() {
  const {navigateAndKeepTheRoutes}=useNavigationUtils()
  return (
    <View style={styles.navBar}>
        <TouchableOpacity style={[{
          width:30,
          height:30,
          borderRadius:25,
          backgroundColor:theme.colors.button,
         
        }]}  onPress={()=>{ navigateAndKeepTheRoutes("note") }}>
       <Text style={styles.addButtonContent}></Text>
     </TouchableOpacity>
        <TouchableOpacity style={[{
          width:50,
          height:50,
          borderRadius:25,
          backgroundColor:theme.colors.button,
          marginBottom:30
        }]} onPress={()=>{ navigateAndKeepTheRoutes("note") }}>
       <Text style={styles.addButtonContent}></Text>
     </TouchableOpacity>
        <TouchableOpacity style={[{
          width:30,
          height:30,
          borderRadius:25,
          backgroundColor:theme.colors.button,
          
        }]} onPress={()=>{ navigateAndKeepTheRoutes("note") }}>
       <Text style={styles.addButtonContent}></Text>
     </TouchableOpacity>
    </View>
     
  )
}

export default NavBar