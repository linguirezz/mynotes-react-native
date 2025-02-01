import { theme } from "../theme"
import { StyleSheet } from "react-native"
const colors = theme.colors
export const Style =  StyleSheet.create({
    container: {
        flex: 1,
        
        flexDirection: "column",
        backgroundColor: colors.background,
        paddingVertical: 50,
        paddingHorizontal: 30,
      },
      headerContainer: {
        width: "100%",
        
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 70,
      },
      headerBtn: {
        backgroundColor: colors.lightBox,
        width: 50,
        height: 50,
        borderRadius: 10, // Ubah menjadi angka
      },
      titleInput:{
            flex:1,
            width: "100%",
            
            backgroundColor: colors.box,
            borderRadius: 20,
            flexDirection: "row",
            marginBottom: 50,
            alignItems: "center",
            overflow: "hidden",
            fontSize:30,
            fontWeight:"600",
            paddingHorizontal:20,
            color:colors.lowLightText
      },
      notesInput:{
        flex:1,
        fontSize:20,
        color:"#FFFFFF"

      }
    }
)