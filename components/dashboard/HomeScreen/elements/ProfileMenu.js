import React from 'react'
import {Modal,TouchableOpacity,View,Text} from 'react-native'
import styles from '../../../../styles/dashboard/home/style'
import { theme } from '../../../../styles/dashboard/theme'
import useHomeScreenUtils from '../hook/useHomeScreenUtils'

function ProfileMenu() {
  const {handleLoginButtonPress,profileMenu,handleLogout,handleMenuOverLayPress,handleSettingsButton} =useHomeScreenUtils();

  return (
    <>
         {/* profile menu */}
         <Modal transparent visible={profileMenu.isVisible} >
                <TouchableOpacity style={styles.menuOverLay} activeOpacity={1} onPress={handleMenuOverLayPress}>
                <View style={[styles.menu ,{right:15 ,top:80,}]} >
                   
                  <TouchableOpacity style={
                    {flex:1,margin:5}
                    }
                    onPress={handleLogout}
                    >
                    <Text style={[{color:theme.colors.dangerText,fontWeight:"600"}]}>Log out</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={
                    {flex:1,margin:5}
                    }
                    onPress={handleSettingsButton}
                    >
                    <Text style={[{color:theme.colors.lowLightText,fontWeight:"600"}]}>Settings</Text>
                  </TouchableOpacity>
                  
                </View>
               
                 </TouchableOpacity>
                </Modal>           
    </>
    
  )
}

export default ProfileMenu