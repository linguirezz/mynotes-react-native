import React from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import { useFolderMenuUtils } from './hooks/useAddFolderMenu'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { theme } from '../../../../styles/dashboard/theme';

function CreateFolderMenu() {
    const {isAddFolderMenuVisible,setIsAddFolderMenuVisible}= useFolderMenuUtils();
    const handleAddFolder = () =>{
        setIsAddFolderMenuVisible(false);
    }
    const handleOverlayMenuPressed = ()=>{
        setIsAddFolderMenuVisible(false);    
    }
  return (
    <>
    {isAddFolderMenuVisible && <TouchableOpacity style={[{
        position:"absolute",
        backgroundColor:"rgba(0,0,0,0.4)",
        width:"100%",
        height:"100%",
        zIndex:10,
        alignItems:"center",
        justifyContent:"center"
    }]}
        onPress={handleOverlayMenuPressed}
    > 
       <View style={[{
          width:300,
          height:200,
          backgroundColor:"black",
          borderRadius:30,
          flexDirection:"column",
          padding:30,              
       }]}>
            <Text style={[{
                color:"white",
                fontSize:25,
                fontWeight:"bold",
                marginBottom:20
            }]}>Name Folder</Text>
            <TextInput style={[{
                width:"100%",
                height:40,
                backgroundColor:theme.colors.box,
                borderRadius:20,
                marginBottom:20,
            }]}/>
            <TouchableWithoutFeedback style={[{
                width:50,
                height:40,
                backgroundColor:theme.colors.button,
                alignItems:"center",
                justifyContent:"center",
                borderRadius:10,
                alignSelf:"flex-end",
                marginRight:5,
            }]}>
                <Text>add</Text>
            </TouchableWithoutFeedback>
        </View> 
    </TouchableOpacity>}
    </>
  )
}

export default CreateFolderMenu