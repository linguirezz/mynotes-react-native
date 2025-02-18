import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../styles/dashboard/home/style';
import { useNavigationUtils } from '../../../navigation/navigationFunction';
import ProfileMenu from './elements/ProfileMenu';
import { useAuthContext } from '../../../contexts/authContext';

function Header() {
  const [profileMenu, setProfileMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    isVisible: false,
    isSelectedAll: false,
  });

  // Use global state
  const { account } = useAuthContext();

  //  Call the hook at the top level
  const { navigateAndKeepTheRoutes, navigateAndResetAllRoutes } = useNavigationUtils();

  // Handle Profile Long Press
  const handleProfileLongPress = (event) => {
    const newX = event.nativeEvent.pageX;
    const newY = event.nativeEvent.pageY;
    console.log('x :', newX);
    console.log('y :', newY);
    setProfileMenu((prevState) => ({
      ...prevState,
      position: { x: newX, y: newY },
      isVisible: true,
    }));
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Notes</Text>
        {/* Check if user is guest or not */}
        {account.isGuest ? (
          // Login button
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigateAndResetAllRoutes('login')} 
          >
            <Text style={{ color: '#ffffff', fontWeight: '800' }}>Login</Text>
          </TouchableOpacity>
        ) : (
          // Profile button
          <TouchableOpacity
            onLongPress={handleProfileLongPress}
            onPress={() => navigateAndResetAllRoutes('profile')} 
          >
            <View style={styles.profile}></View>
          </TouchableOpacity>
        )}
      </View>
      <ProfileMenu isVisible={profileMenu.isVisible} setProfileMenu={setProfileMenu} />
    </>
  );
}

export default Header;