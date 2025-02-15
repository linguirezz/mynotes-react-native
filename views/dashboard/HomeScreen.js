import React, { useEffect,useRef,useState } from 'react'
import { View,Text,Button, TouchableOpacity, Vibration ,Modal, Dimensions} from 'react-native'
import { Checkbox } from 'react-native-paper';
import { signInAsGuestAccount, signOutUser } from '../../services/authServices'
import { navigateAndKeepTheRoutes, navigateAndResetAllRoutes } from '../../navigation/navigationFunction'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Style from '../../styles/dashboard/home/style'
import {theme} from '../../styles/dashboard/theme'
import { uploadsNote,getNotes,editNotes,deleteNote } from '../../services/firestoreServices'
import { SearchBar } from 'react-native-screens'
import { NoteProvider, useNoteContext } from '../../contexts/notesContext'
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
    isVisible : false,
    isSelectedAll : false
  });
   const [pinnedNotes,setPinnedNotes] = useState([])
  // CONTEXT
  // notes context(notes id)
  const {notes,setNotes,isLoading,setIsLoading} = useNoteContext();
  const {account,setAccount}=useAuthContext();
  const [editMenu,setEditMenu] = useState(
    {
     isVisible : false
    }
  )

  

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
    // filter notes which doesnt got selected
    console.log("handleDeleteNotes")
    const remainNotesAfterDelete = notes.filter((note) => note.isSelected !== true );
    // close menu
    setEditMenu((prev) => ({ ...prev, isVisible: false }));
    const updatedNotesSelected = remainNotesAfterDelete.map((note)=>({...note,isSelected:false}));  
     setNotes(updatedNotesSelected)
    //  server change
   await deleteNote(account.uid,id)
  }
  const handleNoteBoxLongPress = async(id,event)=>{ 
    Vibration.vibrate(50);   
    setEditMenu((prevState)=>({...prevState,isVisible : true}))  
    const updatedNotesSelected = notes.map((note)=>{console.log(note.id === id);return note.id === id ? {...note,isSelected:true}:note});    
    setNotes(updatedNotesSelected);  
    // alert("youre long pressed the btn");
  }
  const handleNoteBoxPress =(id)=>{
    if(!editMenu.isVisible ){
      try {
        console.log("id selected",id);
        const updatedNotesSelected = notes.map((note)=>{console.log(note.id === id);return note.id === id ? {...note,isSelected:true}:note});
        console.log("note selected before edit :",updatedNotesSelected)
        setNotes(updatedNotesSelected);
      navigateAndResetAllRoutes(navigation,"note")  
      } catch (error) {
        console.error("error terjadi pada fungsi handleNoteBoxPress:",error)
      }
    
    }else{
      const updatedNotesSelected = notes.map((note)=>{console.log(note.id === id);return note.id === id ? {...note,isSelected:!note.isSelected}:note});
      setNotes(updatedNotesSelected);
    }
   
   
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
   
  const handleSettingsButton= ()=>{
     navigateAndResetAllRoutes(navigation,"settings")
  }
  const handleCloseMenu = ()=>{
    setEditMenu((prev)=>({...prev,isVisible:false}))
    const updatedNotesSelected = notes.map((note)=>({...note,isSelected:false}));  
    setNotes(updatedNotesSelected)
  }
  const handleSelectAll = () => {
    console.log("clicked")
    // Perbarui editMenu dan gunakan nilai baru untuk memperbarui notes
    setEditMenu((prev) => {
      const newSelectedAll = !prev.isSelectedAll; // Nilai baru untuk isSelectedAll
      const updatedNotesSelected = notes.map((note) => ({
        ...note,
        isSelected: newSelectedAll, // Gunakan nilai baru
      }));
      setNotes(updatedNotesSelected); // Perbarui notes
  
      return { ...prev, isSelectedAll: newSelectedAll }; // Perbarui editMenu
    });
  };
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
      setEditMenu((prev) => ({ ...prev, isVisible: false }));
      const updatedNotesSelected = sortedNotes.map((note)=>({...note,isSelected:false}));  
       setNotes(updatedNotesSelected)
  }
 useEffect(()=>{
  console.log("is edit menu visible :",editMenu.isVisible)
 },[editMenu])
  return (
<View  style={Style.container}>
          
       <ScrollView style={Style.scrollView}  >
       {
        !editMenu.isVisible ?
        // header (not in select mode)
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
              <TouchableOpacity onLongPress={handleProfileLongPress}onPress={()=>{navigateAndResetAllRoutes(navigation,"profile")}}>
              <View style={Style.profile}>
              </View>
              </TouchableOpacity >
             }
        </View>
      :
      // menu in select mode (edit menu header)
       <View style={[{ 
        width: "100%",
        height:80,
        flexDirection:"row",
        alignItems: "flex-end",
        marginBottom: 50,
        paddingTop:50,
        paddingHorizontal:30,
    
        }]}>
          <View style={[{width:"100%",height:"50%",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}]}>
          <TouchableOpacity onPress={handleCloseMenu}>
            <View style={{backgroundColor:"red" , width:30,height:30}}></View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View Style={[{flexDirection : "column"}]}>
            <Checkbox
                color="white"
                status={editMenu.isSelectedAll ? 'checked' : 'unchecked'}
                onPress ={handleSelectAll}
                uncheckedColor='white'
              />
              <Text style={[{color:"white" ,fontSize:10}]}>Select All</Text>
            </View>
             
          </TouchableOpacity>  
          </View>
          
       </View>
       } 
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
         <TouchableOpacity style={
           {flex:1,margin:5}
           }
           onPress={handleSettingsButton}
           >
           <Text style={[{color:theme.colors.lowLightText,fontWeight:"600"}]}>Settings</Text>
         </TouchableOpacity>
         
       </View>
      
        </TouchableOpacity>
       </Modal>
       {/* BODY */}
        <View style={[{paddingHorizontal:30}]}>
        {/* search bar */}
            <View style={Style.searchBar}>
              <View style={Style.searchphotoBar}></View>
              <TextInput style={Style.barTextInput} placeholder='Search Notes' placeholderTextColor={"#4B527A"} />
            </View>
        {/* notes group section */}
           {!account ? (
              <Text>loading...</Text> // Tampilkan teks loading
            ) : (
              //notes section
            <View style={Style.notesSection}>
              {/* Kelompok notes kotak (indeks genap) */}
              <View>
                {notes.map((note, index) =>
                 {console.log(note);return index % 2 === 0 ? ( // genap: squareBox
                    <TouchableOpacity
                      style={Style.squareBox}
                      key={index}
                      onLongPress={(event) => handleNoteBoxLongPress(note.id, event)}
                      onPress={()=>{handleNoteBoxPress(note.id)}}
                      delayLongPress={500}  
                    >
                      <View style={[{flexDirection:"row" ,justifyContent:"space-between",alignItems:"center"}]}>
                            <Text style={Style.noteTitle}>{note.title}</Text>
                            {
                              editMenu.isVisible&&
                              <Checkbox
                              color='white'
                              status={note.isSelected ? 'checked' : 'unchecked'}
                            />
                            }
                            {
                              note.isPinned &&
                              <View>
                                <View style={[{
                                  backgroundColor:"white",
                                  width:20,
                                  heigth:20
                                  }]}>
                                    <Text>p</Text>
                                </View>
                              </View>
                            }
                      </View>
                       
                      <Text style={Style.noteContent}>{note.content}</Text> 
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
                      onPress={()=>{handleNoteBoxPress(note.id)}}
                    >
                      
                      <View style={[{flexDirection:"row" ,justifyContent:"space-between",alignItem:"center"}]}>
                            <Text style={Style.noteTitle}>{note.title}</Text>
                            {
                              editMenu.isVisible&&
                              <Checkbox
                              color='white'
                              status={note.isSelected ? 'checked' : 'unchecked'}
                              onPress={() => setIsChecked(!isChecked)}
                            />
                            }
                            
                      </View>
                   
                      <Text style={Style.noteContent}>{note.content}</Text> 
                    </TouchableOpacity>
                  ) : null}
                )}
              </View>
            </View>
          )}
        </View>
       
        
       
    </ScrollView>
    
    {
      editMenu.isVisible ?
      // edit menu
       <View style={[Style.editMenu,{bottom : 0} ]}>
        <TouchableOpacity onPress={handleDeleteNote}>
          <View style={[{width:30,height:30,backgroundColor:"red"}]}></View>
          </TouchableOpacity>
        <TouchableOpacity onPress={handlePinNotes}>
          <View style={[{width:30,height:30,backgroundColor:"white"}]}></View>
          </TouchableOpacity>
        
       </View> 
      // add button 
       :
       <TouchableOpacity style={Style.addButton} onPress={()=>{ navigateAndKeepTheRoutes(navigation,"note") }}>
       <Text style={Style.addButtonContent}></Text>
     </TouchableOpacity>
    }
    
     {/* edit menu */}
       <Modal transparent visible={isMenuVisible} >
       <TouchableOpacity style={Style.menuOverLay} activeOpacity={1} onPress={()=>{;setEditMenu((prevState)=>({...prevState,isVisible : false}))}}>
       <View style={[Style.menu ,{left:menuPosition.x +50,top:menuPosition.y -130}]} >
          
         <TouchableOpacity style={
           {flex:1,margin:5}
           }
           onPress={handleDeleteNote}
           >
           <Text style={[{color:theme.colors.dangerText,fontWeight:"600"}]}>delete</Text>
         </TouchableOpacity>
         <TouchableOpacity style={
           {flex:1,margin:5}
           }
           onPress={handlePinNotes}
           >
           <Text>pin</Text>
         </TouchableOpacity>
         
       </View>
      
        </TouchableOpacity>
       </Modal>
        </View>
  )
}

export default HomeScreen
 