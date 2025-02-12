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
  const [profileMenu,setProfileMenu]=useState({
    position:{
      x:0,
      y:0
    },
    isVisible : false
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
    
    
    
    setNotes((prevNotes)=>prevNotes.filter((note) => note.isSelected !== true ));
    console.log("pek")
    setIsMenuVisible(false)
   await deleteNote(account.uid,id)
  }
  const handleLongPress = async(id,event)=>{
    console.log("long pressed")
    console.log("id selected :",id)
    Vibration.vibrate(50);
    setIsMenuVisible(true);
    console.log(id)
    setNotes((prevNotes)=>prevNotes.map((note)=>{console.log("is item Selected :",note.id === id);return note.id === id ? {...note,isSelected:true}:note}))
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
      console.log("id selected",id);
      const updatedNotesSelected = notes.map((note)=>{console.log(note.id === id);return note.id === id ? {...note,isSelected:true}:note});
      console.log("note selected before edit :",updatedNotesSelected)
      setNotes(updatedNotesSelected);
    navigateAndResetAllRoutes(navigation,"note")  
    } catch (error) {
      console.error("error terjadi pada fungsi handlePress:",error)
    }
  
    const handleAddNoteBtn = ()=>{
    setNotes((prevNotes) =>
      prevNotes.map(note => ({
        ...note,
        isSelected: false
      }))
    );
    navigateAndResetAllRoutes(navigation,"note")
  } 
  }
  const handleProfileLongPress = (event)=>{

    const newX = event.nativeEvent.pageX;
    const newY = event.nativeEvent.pageY;
    console.log("x :",newX)
    console.log("y :",newY)
    setProfileMenu((prevState) => ({
      ...prevState,
      position: { x: newX, y: newY },
      isVisible:true
    }));
  };
  const handleLogout= async()=>{
    console.log("handleLogout (homescreen : 106)")
    setProfileMenu((prev)=>({...prev,isVisible:false}))
    navigateAndResetAllRoutes(navigation,"login")
    await signOutUser()

  }
   
 
 
  return (
        <View  style={Style.container}>
            <ScrollView style={Style.scrollView}  >
        
        <View style={Style.headerContainer}>
        <Text style={Style.header} >My Notes</Text>
      {/* {check if user guest or not} */}
         {account.isGuest ?  
           // login button
           <TouchableOpacity style={Style.loginButton} onPress={()=>{navigateAndResetAllRoutes(navigation,"login")}}>
           <Text style={{color:"#ffffff", fontWeight:"800" }}>Login</Text>
           </TouchableOpacity >
        :
         
             // profile button
        <TouchableOpacity onLongPress={handleProfileLongPress} >
        <View style={Style.profile}>
        </View>
        </TouchableOpacity >
       }
        </View>
        {/* profile menu */}
        <Modal transparent visible={profileMenu.isVisible} >
       <TouchableOpacity style={Style.menuOverLay} activeOpacity={1} onPress={()=>{setProfileMenu((prev)=>({...prev,isVisible:false}))}}>
       <View style={[Style.menu ,{right:15 ,top:80,}]} >
          
         <TouchableOpacity style={
           {flex:1,margin:5}
           }
           onPress={handleLogout}
           >
           <Text style={[{color:theme.colors.dangerText,fontWeight:"600"}]}>Log out</Text>
         </TouchableOpacity>
         {/* <TouchableOpacity style={
           {flex:1,margin:5}
           }>
           <Text>pin</Text>
         </TouchableOpacity> */}
         
       </View>
      
        </TouchableOpacity>
       </Modal>
        {/* search bar */}
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
            key={index}
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
      {notes.map((note, index) =>{console.log("index :",index);
       return index % 2 !== 0 ? ( // ganjil: rectangleBox
          <TouchableOpacity
            style={Style.rectangleBox}
            key={index}
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
       <View style={[Style.menu ,{left:menuPosition.x +50,top:menuPosition.y -130}]} >
          
         <TouchableOpacity style={
           {flex:1,margin:5}
           }
           onPress={handleDeleteNote}
           >
           <Text style={[{color:theme.colors.dangerText,fontWeight:"600"}]}>delete</Text>
         </TouchableOpacity>
         {/* <TouchableOpacity style={
           {flex:1,margin:5}
           }>
           <Text>pin</Text>
         </TouchableOpacity> */}
         
       </View>
      
        </TouchableOpacity>
       </Modal>
        </View>
  )
}

export default HomeScreen
 