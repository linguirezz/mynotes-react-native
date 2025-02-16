import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./authContext";
import { getNotes } from "../services/firestoreServices";
// Membuat context
const NoteContext = createContext();

// Membuat provider
export function NoteProvider({ children }) {
  const [notes,setNotes] = useState([])
  const [isLoading,setIsLoading] = useState(false)  
  const {account}=useAuthContext(); 
    useEffect(()=>{
    
        setIsLoading(true)
        // creating guest account
        
          console.log("account (notesContext : 17)",account.uid)
          console.log(account.uid == true)
          if(account.uid){
            getNotes(account.uid).then(data=>{
              if(data){
                const notesSnapshot =data.map((note)=>{
                  return {
                        id : note.id,
                        title:note.data.title,
                        content:note.data.content,
                        isSelected:false
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
      useEffect(()=>{
        console.log("notes state changed")
        console.log(notes)
        if(account.uid){
            getNotes(account.uid).then(data=>{
              if(data){
                const notesSnapshot =data.map((note)=>{
                  return {
                        id : note.id,
                        title:note.data.title,
                        content:note.data.content,
                        isSelected:false,
                        isPinned:false
                  }
                })
                
              }
              else{
                console.log("there are not datas detected")
                
              }
            
        
              
            })
            .catch(error=>console.error("error was happening while fetching data :",error))
            .finally(setIsLoading(false))
          }
      },[notes])
      
      useEffect(()=>{
        console.log(notes)
      },[notes])
    return (
        <NoteContext.Provider value={{notes,setNotes,isLoading,setIsLoading }}>
            {children}
        </NoteContext.Provider>
    );
}

// Membuat custom hook untuk menggunakan context
export function useNoteContext() {
    return useContext(NoteContext);
}