import React, { useEffect,useState } from 'react'
import { View,Text,Button, TouchableOpacity, Vibration ,Modal} from 'react-native'
import { signInAsGuestAccount, signOutUser } from '../../services/authServices'
import { navigateAndKeepTheRoutes, navigateAndResetAllRoutes } from '../../navigation/navigationFunction'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Style from '../../styles/dashboard/home/style'
import {theme} from '../../styles/dashboard/theme'
import { uploadsNote,getNotes,editNotes,deleteNote } from '../../services/firestoreServices'
import { SearchBar } from 'react-native-screens'
import { useNoteContext } from '../../contexts/notesContext'
import { useAuthContext } from '../../contexts/authContext'
function HomeScreen({navigation}) {
  
  const [isMenuClose,setIsMenuClose]=useState(false);
  const [isMenuVisible,setIsMenuVisible]=useState(false);
  const [menuPosition,setMenuPosition]=useState({
    x:0,
    y:0
  });
  // CONTEXT
  // notes context(notes id)
  const {notes,setNotes,isLoading,setIsLoading} = useNoteContext();
  const {account,setAccount}=useAuthContext();

  // HANDLE FUNCTION
  const handleSignOut= async()=>{
   await signOutUser()
 
  }
  const handleUploadsNote = async()=>{
   await uploadsNote(account.uid)
  }
  const handlegetNotes = async()=>{
   await getNotes(account.uid)
  }
  const handleEditNotes = async()=>{
    console.log("handleEditNotes")
   await editNotes(account.uid,"Twni1I02l1CIqJJyvXsi")
  }
  const handleDeleteNote = async()=>{
    console.log("handleDeleteNotes")
    const id = selectedItem.id;
    const index = selectedItem.index;
    setNotes(notes.filter((note) => note.id !== id ));
    setIsMenuVisible(false)
   await deleteNote(account.uid,id)
  }
  const handleLongPress = async(id,event)=>{
    Vibration.vibrate(50);
    setIsMenuVisible(true);
    console.log(id)
    setNotes(notes.map((note)=>{note.id === id ? {...note,isSelected:true}:note}))
    setMenuPosition(
      {
        x:event.nativeEvent.pageX,
      y:event.nativeEvent.pageY
    }
    );
    // alert("youre long pressed the btn");
  }
  const handlePress =(id)=>{
    try {
      console.log(id);
      const updatedNotesSelected = notes.map((note)=>{console.log(note.id === id);return note.id === id ? {...note,isSelected:true}:note});
      console.log(updatedNotesSelected)
      setNotes(updatedNotesSelected);
    navigateAndResetAllRoutes(navigation,"note")  
    } catch (error) {
      console.error("error terjadi pada fungsi handlePress:",error)
    }
    
  }
  return (
        <View  style={Style.container}>
            <ScrollView style={Style.scrollView}  >
        
        <View style={Style.headerContainer}>
        <Text style={Style.header} >My Notes</Text>
        <TouchableOpacity>
        <View style={Style.profile}></View>
        </TouchableOpacity>
        
        </View>
        <View style={Style.searchBar}>
          <View style={Style.searchphotoBar}></View>
          <TextInput style={Style.barTextInput} placeholder='Search Notes' placeholderTextColor={"#4B527A"} />
        </View>
        {/* notes section */}
        {isLoading ? (
  <Text>loading...</Text> // Tampilkan teks loading
) : (
  <View style={Style.notesSection}>
    {/* Kelompok notes kotak (indeks genap) */}
    <View>
      {notes.map((note, index) =>
       {console.log(note);return index % 2 === 0 ? ( // genap: squareBox
          <TouchableOpacity
            style={Style.squareBox}
            key={note.id}
            onLongPress={(event) => handleLongPress(note.id, event)}
            onPress={()=>{handlePress(note.id)}}
            delayLongPress={500}
          >
            <Text style={Style.noteTitle}>{note.title}</Text>
          </TouchableOpacity>
        ) : null}
      )}
    </View>

    {/* Kelompok notes persegi panjang (indeks ganjil) */}
    <View>
      {notes.map((note, index) =>{console.log(index);
       return index % 2 !== 0 ? ( // ganjil: rectangleBox
          <TouchableOpacity
            style={Style.rectangleBox}
            key={note.id}
            onLongPress={(event) => handleLongPress(note.id, event)}
            delayLongPress={500}
            onPress={()=>{handlePress(note.id)}}
          >
            <Text style={Style.noteTitle} >{note.title}</Text>
            <Text></Text>
          </TouchableOpacity>
        ) : null}
      )}
    </View>
  </View>
)}
    </ScrollView>
    {/* add button */}
    <TouchableOpacity style={Style.addButton} onPress={()=>{ navigateAndKeepTheRoutes(navigation,"note") }}>
      <Text style={Style.addButtonContent}></Text>
    </TouchableOpacity>
     {/* edit menu */}
       <Modal transparent visible={isMenuVisible} >
       <TouchableOpacity style={Style.menuOverLay} activeOpacity={1} onPress={()=>{setIsMenuVisible(false)}}>
       <View style={[Style.menu ,{left:menuPosition.x +30,top:menuPosition.y -150}]} >
          
         <TouchableOpacity style={
           {flex:1,margin:5}
           }
           onPress={handleDeleteNote}
           >
           <Text>delete</Text>
         </TouchableOpacity>
         <TouchableOpacity style={
           {flex:1,margin:5}
           }>
           <Text>edit</Text>
         </TouchableOpacity>
         <TouchableOpacity style={
           {flex:1,margin:5}
           }>
           <Text>pin</Text>
         </TouchableOpacity>
         
       </View>
      
        </TouchableOpacity>
       </Modal>
        </View>
  )
}

export default HomeScreen
 