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
        <View style={styles.folderUnit}></View>
        <View style={styles.folderUnit}></View>
        <View style={styles.folderUnit}></View>
        <View style={styles.folderUnit}></View>
        <View style={styles.folderUnit}></View>
        <View style={styles.folderUnit}></View>
        <View style={styles.folderUnit}></View>
        <View style={styles.folderUnit}></View>
      </ScrollView>
      <TouchableWithoutFeedback onPress={handleOpenAddMenu}>
        <View style={styles.addButton}>
          <Text>add</Text>
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
  },
  addButton: {
    backgroundColor: "white",
    height: 30,
    width: 70,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotesFolder;
