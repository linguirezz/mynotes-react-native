import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
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
      backgroundColor: '#f3f1ff',
      padding:10,
      marginVertical:10,
    
    },
    HeaderStyle:{
        fontSize:28,
        fontWeight:500,
        justifyContent : 'flex-start',
        marginBottom: 40
      },
    SubHeaderStyle:{
        fontSize:17,
        fontWeight:400,
        color:'#B0C4DE',
        marginBottom:40,
        flexWrap:'wrap',
        textAlign:'center'
    }
  });
  export default styles;