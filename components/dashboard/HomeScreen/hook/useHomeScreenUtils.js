/**
 * The function `useHomeScreenUtils` contains logic for handling profile menu, navigation actions, and
 * user authentication in a React Native application.
 * @returns The `useHomeScreenUtils` custom hook is returning an object with the following properties
 * and functions:
 */
import { useState } from "react";
import { useNavigationUtils } from "../../../../navigation/navigationFunction";
import { signOutUser } from "../../../../services/authServices";
function useHomeScreenUtils () {
  /* The `useState` hook in the `useHomeScreenUtils` function is initializing the `profileMenu` state
  variable. It is a state variable that holds an object with properties `position`, `isVisible`, and
  `isSelectedAll`. */
    const [profileMenu, setProfileMenu] = useState({
        position: {
          x: 0,
          y: 0,
        },
        isVisible: false,
        isSelectedAll: false,
      });
    
    
      //  Call the hook at the top level
      const { navigateAndKeepTheRoutes, navigateAndResetAllRoutes } = useNavigationUtils();
    
      // Handle Profile Long Press
      const handleProfileButtonLongPress = (event) => {
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
     /**
      * The `handleLoginButtonPress` function navigates to the 'login' route and resets all routes.
      */
      const handleLoginButtonPress=()=>{
        navigateAndResetAllRoutes('login')
      }
    /**
     * The `handleProfileButtonPress` function navigates to the 'profile' route and resets all routes.
     */
      const handleProfileButtonPress=()=>{
        navigateAndResetAllRoutes('profile')
      }
    /**
     * The `handleLogout` function logs a message, hides the profile menu, navigates to the login
     * screen, signs out the user, and resets all routes.
     */
      const handleLogout= async()=>{
        console.log("handleLogout (homescreen : 106)")
        setProfileMenu((prev)=>({...prev,isVisible:false}))
        navigateAndResetAllRoutes("login")
        await signOutUser()
    
      }
/**
 * The `handleSettingsButton` function navigates to the "settings" route and resets all routes.
 */  
      const handleSettingsButton= ()=>{
        navigateAndResetAllRoutes("settings")
     }
        /**
      * The function `handleMenuOverLayPress` sets the `isVisible` property of the `profileMenu` state
      * to `false`.
      */
     const handleMenuOverLayPress = ()=>{
        setProfileMenu((prev)=>({...prev,isVisible:false}))
     }
     
    return{profileMenu,handleProfileButtonLongPress,handleLoginButtonPress,handleLogout,handleSettingsButton,handleMenuOverLayPress,handleSettingsButton}
}
export default useHomeScreenUtils