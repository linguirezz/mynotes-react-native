import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

export function useNavigationUtils() {
  const navigation = useNavigation();

  const navigateAndResetAllRoutes = (route) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: route }],
      })
    );
  };

  const navigateAndKeepTheRoutes = (routes) => {
    try {
      navigation.navigate(routes);
    } catch (error) {
      console.error("Error in navigateAndKeepTheRoutes:", error);
    }
  };

  return { navigateAndResetAllRoutes, navigateAndKeepTheRoutes };
}