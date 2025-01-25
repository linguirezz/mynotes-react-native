import React from 'react'
import { View,Text,Button, TouchableOpacity } from 'react-native'
import { signOutUser } from '../../services/authServices'
import { navigateAndResetAllRoutes } from '../../navigation/navigationFunction'
import { ScrollView } from 'react-native-gesture-handler'
import homeScreen from '../../styles/dashboard/homeScreenStyle'
import { uploadsNote,getNotes,editNotes,deleteNote } from '../../services/firestoreServices'
function HomeScreen({navigation}) {
  const handleSignOut= async()=>{
   await signOutUser()
 
  }
  const handleUploadsNote = async()=>{
   await uploadsNote("12345678")
  }
  const handlegetNotes = async()=>{
   await getNotes("12345678")
  }
  const handleEditNotes = async()=>{
    console.log("handleEditNotes")
   await editNotes("12345678","Twni1I02l1CIqJJyvXsi")
  }
  const handleDeleteNote = async()=>{
    console.log("handleDeleteNotes")
   await deleteNote("12345678","qMNlMldq3Zkdi0n4Wx3Z")
  }
  return (
    <ScrollView>
       <View style={homeScreen.safeView}>
        <View style={homeScreen.flexHorizontalBetween}>
       <Text style={homeScreen.header}>Notes</Text>
        <TouchableOpacity style={homeScreen.accountView}></TouchableOpacity>
        </View>
        <TouchableOpacity style={homeScreen.addButton}>
          <Text style={homeScreen.addButtonElement}>+</Text>
        </TouchableOpacity>
       {/* <Button title="logout" onPress={handleSignOut}/> */}
       <Button title='add doc' onPress={handleUploadsNote}/>
       <Button title='get doc' onPress={handlegetNotes}/>
       <Button title='edit doc' onPress={handleEditNotes}/>
       <Button title='delete doc' onPress={handleDeleteNote}/>
      </View>    
    </ScrollView>
  
  )
}

export default HomeScreen
