import React from 'react'
import {View,TouchableOpacity} from "react-native"
import styles from '../../../../styles/dashboard/home/style'
import { deleteNote, moveNotesIntoFolder } from '../../../../services/firestoreServices'
import { useToolBar } from '../../../../contexts/toolBarContext';
import { useNoteContext } from '../../../../contexts/notesContext';
import { useAuthContext } from '../../../../contexts/authContext';
function LowerToolBar() {
    const {notes,setNotes}=useNoteContext();
    const {setToolBar} = useToolBar()
    const {account} =useAuthContext();
const handlePinNotes= () =>{
        // Jika notes selected, ubah pinnya menjadi true
         const updatedNotes = notes.map((note) =>
           note.isSelected ? { ...note, isPinned: !note.isPinned } : note
         );
         
         // Sort notes: pinned notes di atas
         const sortedNotes = [...updatedNotes].sort((a, b) =>
           a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1
         );
          
         // Tutup menu
         setToolBar((prev) => ({ ...prev, isVisible: false }));
         const updatedNotesSelected = sortedNotes.map((note)=>({...note,isSelected:false}));  
          setNotes(updatedNotesSelected)
     }
     const handleDeleteNote = async()=>{
        // filter notes which doesnt got selected
        console.log("handleDeleteNotes")
        const remainNotesAfterDelete = notes.filter((note) => note.isSelected !== true );
        // close menu
        setToolBar((prev) => ({ ...prev, isVisible: false }));
        const updatedNotesSelected = remainNotesAfterDelete.map((note)=>({...note,isSelected:false}));  
         setNotes(updatedNotesSelected)
        //  server change
       await deleteNote(account.uid,id)
      }
      const handleMoveNotes = async ()=>{
        const selectedNotes = notes.filter(note=>(note.isSelected === true))
        const selectedIds = selectedNotes.map(selectedNote => (selectedNote.id))
        await moveNotesIntoFolder(account.uid,selectedIds,"works")
      }
  return (
    <View style={[styles.toolBar,{bottom : 0} ]}>
    <TouchableOpacity onPress={handleDeleteNote}>
      <View style={[{width:30,height:30,backgroundColor:"red"}]}></View>
      </TouchableOpacity>
    <TouchableOpacity onPress={handlePinNotes}>
      <View style={[{width:30,height:30,backgroundColor:"white"}]}></View>
      </TouchableOpacity>
    <TouchableOpacity onPress={handleMoveNotes}>
      <View style={[{width:30,height:30,backgroundColor:"blue"}]}></View>
      </TouchableOpacity>
   </View> 
  )
}

export default LowerToolBar