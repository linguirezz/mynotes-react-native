import React, { useState,useEffect } from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import { useFolderMenuUtils } from './hooks/useFolderContext'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { theme } from '../../../../styles/dashboard/theme';
import { createFolder } from '../../../../services/firestoreServices';
import { useAuthContext } from '../../../../contexts/authContext';
function CreateFolderMenu() {
    const {account} =useAuthContext();
    const {isAddFolderMenuVisible,setIsAddFolderMenuVisible,setFoldersList,currentFolder}= useFolderMenuUtils();
    const [inputValue,setInputValue] = useState({
        folderId : ""
    });
    const handleInputChanged=(text)=>{
        setInputValue({...inputValue,folderId:text})
    }
    const handleAddFolder = async () =>{
        
        console.log("adding new folder")
        const {folderId} = inputValue
        if (currentFolder === "all folders") {
            setFoldersList(prev => [...prev, { folderId, parentFolderId: "all folders" }]);
        } else {
            setFoldersList(prev => [...prev, { folderId, parentFolderId: currentFolder }]);
        }
        console.log("currently we are in ",currentFolder,"folder")
       
        const response = await createFolder(account.uid,folderId,currentFolder === "all folders"?"all folders" : currentFolder);
        console.log("creating folder .....")
        if(response.success === true){
            console.log("folder berhasil dibuat")
        }
        else{
            console.log("folder gagal dibuat")
        }
        setIsAddFolderMenuVisible(false);
    }
    const handleOverlayMenuPressed = ()=>{
        setIsAddFolderMenuVisible(false);    
    }
    useEffect(()=>{
        console.log(inputValue)
    },[inputValue])
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
                paddingHorizontal:10
            }]}
            onChangeText={(text)=>{
                handleInputChanged(text)
            }}
            />
            <TouchableWithoutFeedback style={[{
                width:50,
                height:40,
                backgroundColor:theme.colors.button,
                alignItems:"center",
                justifyContent:"center",
                borderRadius:10,
                alignSelf:"flex-end",
                marginRight:5,
            }]}
            onPress={handleAddFolder}
            >
                <Text>add</Text>
            </TouchableWithoutFeedback>
        </View> 
    </TouchableOpacity>}
    </>
  )
}

export default CreateFolderMenu