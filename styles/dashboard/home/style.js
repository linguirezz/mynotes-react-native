import { StyleSheet } from "react-native";
import { theme } from "../theme";
const colors = theme.colors;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        flexDirection: "column",
        backgroundColor: colors.background,
        paddingVertical: 50,
        paddingHorizontal: 30,
      },
      scrollView: {
        flex: 1,
      },
  header: {
    fontSize: 40,
    color: colors.text,
    fontWeight:"bold"
  },
  profile: {
    backgroundColor: "#B3A197",
    width: 50,
    height: 50,
    borderRadius: 25, // Ubah menjadi angka
  },
  headerContainer: {
    width: "100%",
    
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },
  searchBar: {
    width: "100%",
    height: 60,
    backgroundColor: colors.box,
    borderRadius: 30,
   
    flexDirection: "row",
    marginBottom: 50,
    alignItems: "center",
    overflow: "hidden",
  },
  searchphotoBar: {
    height: 30,
    width: 30,
    backgroundColor: "#ffffff",
    borderRadius: 15, // Ubah menjadi angka
    marginHorizontal: 20,
  },
  barTextInput: {
    width: "100%",
    height: "100%",
    fontSize: 20,
    color: "#ffffff",
  },
  notesSection: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
    
  },
  squareBox: {
    backgroundColor: colors.box,
    width: 150,
    height: 180,
    borderRadius: 20,
    marginBottom:20,
    padding:20
  },
  rectangleBox: {
    backgroundColor: colors.box,
    width: 150,
    height: 220,
    borderRadius: 20,
    marginBottom:20,
    padding:20
  },
  squareBoxGroup:{
    flexDirection:"column",
    
  },
  addButton: {
    backgroundColor: colors.button,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    position: "absolute",
    bottom: 50,
    right:"50%",
    transform: [{ translateX: -10 }],
     // Tambahkan ini untuk menempatkan tombol di sudut kanan bawah
  },

  addButtonContent: {
    fontSize: 50,
    margin: 0,
    color: "#ffffff", // Tambahkan warna teks jika diperlukan
  },
  menuOverLay:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',

  }, 
  menu: {
    width:80,
    height:"auto",
    position: 'absolute',
    backgroundColor: colors.lightBox,
    borderRadius: 8,
    padding: 10,
    flexDirection:"column",
    justifyContent:"space-between"
  },
  noteTitle:{
    fontWeight:"bold",
    fontSize:20,
    color:"white"
  }
});

export default styles;
