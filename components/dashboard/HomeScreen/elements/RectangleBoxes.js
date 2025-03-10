import React from 'react'
import {View,Text,TouchableOpacity,Vibration} from "react-native"
import { useNoteContext } from '../../../../contexts/notesContext';
import { useToolBar } from '../../../../contexts/toolBarContext';
import styles from '../../../../styles/dashboard/home/style';
import { Checkbox } from 'react-native-paper';
import { useNavigationUtils } from '../../../../navigation/navigationFunction';
import { useFolderMenuUtils } from '../notesFolderComponents/hooks/useFolderContext';
function RectangleBoxes() {
   const {notes,setNotes} = useNoteContext();
    const {toolBar,setToolBar}=useToolBar()
    const {navigateAndResetAllRoutes}=useNavigationUtils();
    const {currentFolder} =useFolderMenuUtils();
    // handleNoteBoxLongPress
     const handleNoteBoxLongPress = async(id,event)=>{ 
        Vibration.vibrate(50);   
        setToolBar((prevState)=>({...prevState,isVisible : true}))  
        const updatedNotesSelected = notes.map((note)=>{console.log(note.id === id);return note.id === id ? {...note,isSelected:true}:note});    
        setNotes(updatedNotesSelected);  
        // alert("youre long pressed the btn");
      }
      // handleNoteBoxPress
      const handleNoteBoxPress =(id)=>{
        if(!toolBar.isVisible ){
          try {
            console.log("id selected",id);
            const updatedNotesSelected = notes.map((note)=>{console.log(note.id === id);return note.id === id ? {...note,isSelected:true}:note});
            console.log("note selected before edit :",updatedNotesSelected)
            setNotes(updatedNotesSelected);
          navigateAndResetAllRoutes("note")  
          } catch (error) {
            console.error("error terjadi pada fungsi handleNoteBoxPress:",error)
          }
        
        }else{
          const updatedNotesSelected = notes.map((note)=>{console.log(note.id === id);return note.id === id ? {...note,isSelected:!note.isSelected}:note});
          setNotes(updatedNotesSelected);
        }     
      }
   
  return (
    <View>
    {notes.filter((note)=>{return currentFolder === note.parentFolderId}).map((note, index) =>{console.log("index :",index);
     return index % 2 !== 0 ? ( // ganjil: rectangleBox
        <TouchableOpacity
          style={styles.rectangleBox}
          key={index}
          onLongPress={(event) => handleNoteBoxLongPress(note.id, event)}
          delayLongPress={500}
          onPress={()=>{handleNoteBoxPress(note.id)}}
        >
          
          <View style={[{flexDirection:"row" ,justifyContent:"space-between",alignItem:"center"}]}>
                <Text style={styles.noteTitle}>{note.title}</Text>
                {
                  toolBar.isVisible&&
                  <Checkbox
                  color='white'
                  status={note.isSelected ? 'checked' : 'unchecked'}
                  onPress={() => setIsChecked(!isChecked)}
                />
                }
                
          </View>
       
          <Text style={styles.noteContent}>{note.content}</Text> 
        </TouchableOpacity>
      ) : null}
    )}
  </View>
  )
}

export default RectangleBoxes