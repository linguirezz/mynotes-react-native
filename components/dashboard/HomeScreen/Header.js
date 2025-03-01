import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../styles/dashboard/home/style';
import { useNavigationUtils } from '../../../navigation/navigationFunction';
import ProfileMenu from './elements/ProfileMenu';
import { useAuthContext } from '../../../contexts/authContext';
import useHomeScreenUtils from './hook/useHomeScreenUtils';

function Header() {
  // Use global state for accesing account property
  const { account } = useAuthContext();
  const {handleLoginButtonPress,handleProfileButtonLongPress,profileMenu} =useHomeScreenUtils();
 

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Notes</Text>
        {/* Check if user is guest or not */}
        {account.isGuest ? (
          // Login button
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginButtonPress } 
          >
            <Text style={{ color: '#ffffff', fontWeight: '800' }}>Login</Text>
          </TouchableOpacity>
        ) : (
          // Profile button
          <TouchableOpacity
            onLongPress={handleProfileButtonLongPress}
            onPress={handleProfileButtonPress} 
          >
            <View style={styles.profile}></View>
          </TouchableOpacity>
        )}
      </View>
      <ProfileMenu isVisible={profileMenu.isVisible}  />
    </>
  );
}

export default Header;