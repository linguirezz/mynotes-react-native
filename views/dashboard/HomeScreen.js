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
  const [notes,setNotes] = useState([]);
  const[isLoading,setIsLoading]= useState(true);
  const [isMenuClose,setIsMenuClose]=useState(false);
  const [isMenuVisible,setIsMenuVisible]=useState(false);
  const [menuPosition,setMenuPosition]=useState({
    x:0,
    y:0
  });
  const [selectedItem,setSelectedItem]=useState({
    id:"",
    index:""
  });
  // const [isThereAnAccount,setIsThereAnAccount] = useState(false)
  // CONTEXT
  // notes context(notes id)
  const {setNoteContext} = useNoteContext();
  const {account,setAccount}=useAuthContext();


  // rendering all the pages need when the homepage firstly rendered
  useEffect(()=>{
    
    setIsLoading(true)
    // creating guest account
    
      console.log("account",account.uid)
      console.log(account.uid == true)
      if(account.uid){
        getNotes(account.uid).then(data=>{
          if(data){
            const notesSnapshot =data.map((note)=>{
              return {
                id:note.id,
                title:note.data.title,
                content:note.data.content
              }
            })
            setNotes(notesSnapshot)   
          }
          else{
            console.log("there are not datas detected")
            
          }
        
    
          
        })
        .catch(error=>console.error("error was happening while fetching data :",error))
        .finally(setIsLoading(false))
      }
  },[account])
//  checking the notes state uncommand this if you wanna check the notes state 
  useEffect(() => { 
    // console.log(notes)
    // console.log(notes.length)
    // case : gunakan ini jika anda ingin melihat apakah data sudah teranu
  }, [notes])
//  checking the authContext
useEffect(() => { 
  console.log("the account state is changing")
  console.log("account in use :",account.uid)
}, [account])
  
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
    setSelectedItem({
      id
    } )
    
    
    
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
      console.log(id)
    setNoteContext({id})
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
        index % 2 === 0 ? ( // genap: squareBox
          <TouchableOpacity
            style={Style.squareBox}
            key={note.id}
            onLongPress={(event) => handleLongPress(note.id, event)}
            onPress={()=>{handlePress(note.id)}}
            delayLongPress={500}
          >
            <Text style={Style.noteTitle}>{note.title}</Text>
          </TouchableOpacity>
        ) : null
      )}
    </View>

    {/* Kelompok notes persegi panjang (indeks ganjil) */}
    <View>
      {notes.map((note, index) =>
        index % 2 !== 0 ? ( // ganjil: rectangleBox
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
        ) : null
      )}
    </View>
  </View>
)}
    </ScrollView>
    {/* add button */}
    <TouchableOpacity style={Style.addButton} onPress={()=>{setNoteContext({id:null}); navigateAndKeepTheRoutes(navigation,"note") }}>
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
 