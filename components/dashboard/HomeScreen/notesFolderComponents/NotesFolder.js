import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { useFolderMenuUtils } from './hooks/useAddFolderMenu';

function NotesFolder() {
  const { setIsAddFolderMenuVisible } = useFolderMenuUtils();
  const handleOpenAddMenu = () => {
    console.log("menu is open")
    setIsAddFolderMenuVisible(true);
  }
  return (
    <View style={[{
        marginBottom:20
    }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // Menyembunyikan scrollbar
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Folder units */}
        <View style={styles.folderUnit}><Text>Folder</Text></View>
        <View style={styles.folderUnit}><Text>Folder</Text></View>
        <View style={styles.folderUnit}><Text>Folder</Text></View>
        <View style={styles.folderUnit}><Text>Folder</Text></View>
        <View style={styles.folderUnit}><Text>Folder</Text></View>
        <View style={styles.folderUnit}><Text>Folder</Text></View>
        <View style={styles.folderUnit}><Text>Folder</Text></View>
        
      </ScrollView>
      <TouchableWithoutFeedback onPress={handleOpenAddMenu}>
        <View style={styles.addButton}>
          <Text style={[{color:'white' ,fontWeight:"700"}]}>+</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 10, // Memberikan padding agar folder tidak menempel ke tepi layar
  },
  folderUnit: {
    height: 30,
    width: 70,
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 5, // Memberikan jarak antar folder
    alignItems:"center",
    justifyContent:"center"
  },
  addButton: {
    backgroundColor: "white",
    height: 30,
    width: 71,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius : 35,
    borderBottomLeftRadius : 35,
    backgroundColor:'black',
    
  },
});

export default NotesFolder;
