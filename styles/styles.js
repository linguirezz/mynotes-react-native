import { StyleSheet } from "react-native";
import { theme } from "./dashboard/theme";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      flexDirection:'column',
      paddingTop:80,
      paddingHorizontal:40
    },
    contentContainer:{
      alignItems: 'center'
    },
    InputContainer :{

      flexDirection:'row',
      width:'100%',
      borderRadius:30,
      backgroundColor: theme.colors.box,
      color:theme.colors.lowLightText,
      padding:10,
      marginVertical:10,
  },
    textInput:{
      width:"100%",
      color:"#B0C4DE"
    },
    HeaderStyle:{
        fontSize:40,
        fontWeight:"600",
        justifyContent : 'flex-start',
        marginBottom: 40,
        color:"#ffffff",
      },
    secondaryText:{
        fontSize:17,
        fontWeight:400,
        color:theme.colors.secondaryText,
       
        flexWrap:'wrap',
        textAlign:'center'
    },
    submitBtn:{
      backgroundColor:theme.colors.button,
      paddingVertical:15,
      borderRadius:10,
      flexDirection:"row",
      justifyContent:"center"
    },
    submitBtnText:{
      fontWeight:"600",
      fontSize:17,
      color:"#ffffff"
    },
    googleBtn:{
      backgroundColor:"white",
      paddingVertical:15,
      borderRadius:10,
      flexDirection:"row",
      justifyContent:"center"
    },
    anchorText:{
      color:"#ffffff",
      marginTop:"auto",
      fontSize:17,
      marginTop:"auto"
    }
  });
  export default styles;