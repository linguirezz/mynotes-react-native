import { StyleSheet } from "react-native";
const homeScreen= StyleSheet.create({
    safeView:{
        paddingVertical:60,
        paddingHorizontal: 30,
        width:"100%",
        
        
    },
    header:{
        fontSize:40,
        fontWeight:400,
        margin:0
    },
    flexHorizontalBetween:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        borderWidth:2,
        borderColor:"transparent"
    },
    accountView:{
        width: 50,
        height: 50,
        backgroundColor: 'powderblue',
        borderRadius:"100%"
    },
    addButton:{
        width: 50,
        height: 50,
        backgroundColor: 'powderblue',
        borderRadius:"100%",
        flex:1,
        justifyContent:"center",
        alignItems:"center" 
    },
    addButtonElement:{
        fontSize:40,
        fontWeight:"bold"        
    }
    
  });
  export default homeScreen;