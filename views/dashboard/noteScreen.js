import React, { useState ,useEffect} from 'react'
import {  View ,TextInput, Touchable, TouchableOpacity,Text,Modal,} from 'react-native'
import { Style } from '../../styles/dashboard/notes/style'
import { ScrollView } from 'react-native-gesture-handler'
import { theme } from '../../styles/dashboard/theme'
import { editNotes, getNote, uploadsNote } from '../../services/firestoreServices'
import { getCurrentUser } from '../../services/authServices'
import { navigateAndResetAllRoutes } from '../../navigation/navigationFunction'
import { useNoteContext } from '../../contexts/notesContext'
function NoteScreen({navigation}) {
  const [note,setNote] =useState(
    {
      title:"",
      content:""
    })
    const [isLoading,setIsLoading] = useState(false)
    const {noteContext} = useNoteContext();
   const handleNote =(key,value)=>{
    setNote({...note,[key]:value}) 
   }
    const handleSave= async  ()=>{
      if(noteContext.id === null ){
        const {title,content}= note
        console.log("data will be saved")
        console.log("data :",note)
        // FOR PRODUCTION
        // const user = await getCurrentUser()
        // await uploadsNote(user,title,content)
        navigateAndResetAllRoutes(navigation,"home")
        await uploadsNote(12345678,title,content)
      }
      else{
        const {title,content}= note
        console.log("data will be edited and saved");
        await editNotes("12345678",noteContext.id,title,content);
        navigateAndResetAllRoutes(navigation,"home")
      }
    }
    useEffect(()=>{
       console.log(noteContext.id !== null)
      if(noteContext.id !== null ){
        setIsLoading(true)
      getNote("12345678",noteContext.id)
      .then(document => {
        if(document){
          const note = document.data;
        const content = note.content;
        const title = note.title;
        setNote({
          title,
          content
        })
        }
        
      })
      .catch(error=>console.error("error was happening while fetching data :",error))
      .finally(setIsLoading(false))
      }else{
        console.log("no notes selected")
      }
      
    },[])
    useEffect(()=>{
      console.log(
        `title:${note.title} 
        content:${note.content}
        `)  
    },[note])
    // for checking the noteContext id
    // useEffect(()=>{
      
    //   console.log("id :",noteContext.id)
    // },[noteContext])
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