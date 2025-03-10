import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useFolderMenuUtils } from './hooks/useFolderContext';
import { useAuthContext } from '../../../../contexts/authContext';
import { useNoteContext } from '../../../../contexts/notesContext';

function NotesFolder() {
  const { setIsAddFolderMenuVisible,foldersList,setCurrentFolder,currentFolder } = useFolderMenuUtils();
  const {account} =useAuthContext();
  const {notes,setNotes}= useNoteContext();
  const [parentId,setParentId] = useState([])
  const handleOpenAddMenu = () => {
    console.log("menu is open")
    setIsAddFolderMenuVisible(true);
  }
  const handleUnitFolderPress = (currentFolder,parent)=>{ 
    setCurrentFolder( currentFolder)
    setParentId(prev=>[...prev,parent])
    console.log("currently we are in ",currentFolder,"folder")
  }
  const handleBackToPrevFolder=()=>{
    
    const selectedParentId = parentId[parentId.length - 1]
    setCurrentFolder(selectedParentId)
    const deleteTheLastParentId = parentId.filter(item => item !== selectedParentId)
    setParentId(deleteTheLastParentId)

  }
  useEffect(()=>{console.log(parentId)},[parentId])
  return (
    <View style={[{
        marginBottom:20
    }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // Menyembunyikan scrollbar
        contentContainerStyle={styles.scrollContainer}
      >
        {
          currentFolder === "all folders" || <TouchableOpacity onPress={handleBackToPrevFolder} style={styles.folderUnit}>
          <Text style={[{
            fontSize:20,
            fontWeight:"700"
          }]}>...</Text>
          </TouchableOpacity>
        }
        
        {/* Folder units */}
        {
          foldersList.map(folder=> <TouchableOpacity onPress={()=>{handleUnitFolderPress(folder.folderId,folder.parentFolderId)}} key={folder.folderId}   style={styles.folderUnit}><Text>{folder.folderId}</Text></TouchableOpacity>)
        }
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
    paddingRight:80
    
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
