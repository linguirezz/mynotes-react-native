import React, { useState ,useEffect} from 'react'
import {  View ,TextInput, Touchable, TouchableOpacity,Text,Modal,} from 'react-native'
import { Style } from '../../styles/dashboard/notes/style'
import { ScrollView } from 'react-native-gesture-handler'
import { theme } from '../../styles/dashboard/theme'
import { editNotes, getNote, uploadsNote } from '../../services/firestoreServices'
import { getCurrentUser } from '../../services/authServices'
import { navigateAndResetAllRoutes } from '../../navigation/navigationFunction'
import { useNoteContext } from '../../contexts/notesContext'
import { useAuthContext } from '../../contexts/authContext'
function NoteScreen({navigation}) {
  const [note,setNote] =useState(
    {
      title:"",
      content:""
    })
    const [isLoading,setIsLoading] = useState(false)
    const [isSelectedItem,setIsSelectedItem] = useState(false);
    const [currentNote,setCurrentNote] = useState(false);

    // CONTEXT
    const {notes,setNotes} = useNoteContext();
    const {account} = useAuthContext()
    // HANDLE FUNCTION
    const handleNote =(key,value)=>{
    setNote({...note,[key]:value}) 
   }
    const handleSave= async  ()=>{
     console.log(isSelectedItem) 
      if(isSelectedItem === false){
        const {title,content}= note
        console.log("data will be saved")
        console.log("data :",note)
        
      
        navigateAndResetAllRoutes(navigation,"home")
        // server update
        const notesUploaded = await uploadsNote(account.uid,title,content)
        const docId = notesUploaded.id;
          // ui update 
          console.log(notes)
          setNotes((prevNotes) => [
            ...prevNotes,
            {
              id: docId,
              title: title,
              content: content,
              isSelected: false
            }
          ]);
        // id update
      //   const updateNotesList = notes.map((note)=>{
      //     note.id === null ? {...note ,id:docId}:note
      //   })
        
      //  setNotes(updateNotesList)
      }
      else{
     

        // ui update
         const {title,content} = note
        const updateNotesList = notes.map((item)=>{
        
         return item.isSelected === true ? {...item,title,content} :item
        })

        console.log("data will be edited and saved");
        setNotes(updateNotesList);
        navigateAndResetAllRoutes(navigation,"home");
        //  server update
        console.log(currentNote)
         await editNotes(account.uid,currentNote.id,note.title,note.content);
      }
    }
    useEffect(()=>{
      console.log("notescreen useEffect")
      const selectedItem = notes.filter(note=> note.isSelected === true );
      console.log(selectedItem)
      const isSelectedItemHasLength =selectedItem.length === 0 ? false : true;
      console.log(isSelectedItemHasLength)
      
      setIsSelectedItem((prev)=> isSelectedItemHasLength )
      const currentNote = selectedItem[0]
      setCurrentNote(currentNote)
      
    },[notes])
   
    useEffect(()=>{
      console.log("isSelectedItem :",isSelectedItem);
      
       
      
      if(isSelectedItem === true){
        console.log(currentNote.title)
        console.log("woii")
        setNote({
          title:currentNote.title,
          content:currentNote.content
        })
        console.log( "note sudah ter set")
        
      }else{
        console.log("no notes selected")
      }
      
    },[isSelectedItem,currentNote])
   
  return (
    <View style={Style.container}>
        <View style={Style.headerContainer}>
            <TouchableOpacity style={Style.headerBtn} onPress={handleSave}>
                 <Text>hai</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.headerBtn}>

            </TouchableOpacity>
        </View>
        <ScrollView >
            <TextInput 
            onChangeText={(text)=>{handleNote("title",text)}}
            style={Style.titleInput}
             placeholder='Write title...'
            placeholderTextColor={theme.colors.lowLightText} 
            multiline={true}
            value={note.title}
            />
            <TextInput 
            onChangeText={(text)=>{handleNote("content",text)}}
             style={Style.notesInput} 
             placeholder='Write your notes here...'
             multiline={true} // Mengaktifkan multiline
             textAlignVertical="top"
             placeholderTextColor={theme.colors.lowLightText}
             value={note.content}
             />
        </ScrollView>
    </View>
  )
}

export default NoteScreen