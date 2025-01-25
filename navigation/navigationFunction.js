import { CommonActions } from "@react-navigation/native"
function navigateAndResetAllRoutes(navigation,route){
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: route }], }))
}
function navigateAndKeepTheRoutes(navigation,routes){
    navigation.navigate(routes)
}
export{navigateAndKeepTheRoutes,navigateAndResetAllRoutes}