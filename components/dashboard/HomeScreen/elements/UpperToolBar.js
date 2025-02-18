import React from 'react'
import {View,TouchableOpacity,Text} from "react-native"
import { Checkbox } from 'react-native-paper';
import { useToolBar } from '../../../../contexts/toolBarContext';
import { useNoteContext } from '../../../../contexts/notesContext';
function UpperToolBar() {
    const {notes,setNotes}=useNoteContext();
    const {toolBar,setToolBar} = useToolBar()
    const handleCloseMenu = ()=>{
        setToolBar((prev)=>({...prev,isVisible:false}))
        const updatedNotesSelected = notes.map((note)=>({...note,isSelected:false}));  
        setNotes(updatedNotesSelected)
      }
      const handleSelectAll = () => {
        console.log("clicked")
        // Perbarui toolBar dan gunakan nilai baru untuk memperbarui notes
        setToolBar((prev) => {
          const newSelectedAll = !prev.isSelectedAll; // Nilai baru untuk isSelectedAll
          const updatedNotesSelected = notes.map((note) => ({
            ...note,
            isSelected: newSelectedAll, // Gunakan nilai baru
          }));
          setNotes(updatedNotesSelected); // Perbarui notes
      
          return { ...prev, isSelectedAll: newSelectedAll }; // Perbarui toolBar
        });
      };
  return (
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
                status={toolBar.isSelectedAll ? 'checked' : 'unchecked'}
                onPress ={handleSelectAll}
                uncheckedColor='white'
              />
              <Text style={[{color:"white" ,fontSize:10}]}>Select All</Text>
            </View>
             
          </TouchableOpacity>  
          </View>
          
       </View>
  )
}
export default UpperToolBar