import { CommonActions } from "@react-navigation/native"
// TODO buat catch and try
function navigateAndResetAllRoutes(navigation,route){
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: route }], }))
}
function navigateAndKeepTheRoutes(navigation,routes){
    try {
        
        navigation.navigate(routes)
    } catch (error) {
        console.error("ada masalah di fungsi navigate and routes")
        console.error(error);
    }
}
export{navigateAndKeepTheRoutes,navigateAndResetAllRoutes}