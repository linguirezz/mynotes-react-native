import React from 'react'
import {View,Text,TouchableOpacity,Vibration} from "react-native"
import { Checkbox } from 'react-native-paper';
import { useNoteContext } from '../../../contexts/notesContext';
import styles from '../../../styles/dashboard/home/style';
import { useToolBar } from '../../../contexts/toolBarContext';


function SquareBoxes() {
  const {notes,setNotes} = useNoteContext();
  const {toolBar,setToolBar}=useToolBar()
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
        navigateAndResetAllRoutes(navigation,"note")  
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
    {notes.map((note, index) =>
     {console.log(note);return index % 2 === 0 ? ( // genap: squareBox
        <TouchableOpacity
          style={styles.squareBox}
          key={index}
          onLongPress={(event) => handleNoteBoxLongPress(note.id, event)}
          onPress={()=>{handleNoteBoxPress(note.id)}}
          delayLongPress={500}  
        >
          <View style={[{flexDirection:"row" ,justifyContent:"space-between",alignItems:"center"}]}>
                <Text style={styles.noteTitle}>{note.title}</Text>
                {
                  toolBar.isVisible&&
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
           
          <Text style={styles.noteContent}>{note.content}</Text> 
        </TouchableOpacity>
      ) : null}
    )}
  </View>
  )
}

export default SquareBoxes