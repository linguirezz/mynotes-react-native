import { useEffect } from 'react';
import { useNoteContext } from '../../../../contexts/notesContext';
import { useNavigationUtils } from '../../../../navigation/navigationFunction'
import { useAuthContext } from '../../../../contexts/authContext'
import { uploadsNote } from '../../../../services/firestoreServices'
import { editNotes } from '../../../../services/firestoreServices';
import { useFolderMenuUtils } from '../../HomeScreen/notesFolderComponents/hooks/useFolderContext';
function useNotesScreenUtils(){
    const {navigateAndResetAllRoutes} =useNavigationUtils();
    const {currentNote,setNotes,note,setNote}= useNoteContext();
    const {account}=useAuthContext()
    const {currentFolder} = useFolderMenuUtils();
     // Handle save/update note
       const handleSave = async () => {
       
         try {
           const { title, content } = note
           if (currentNote) {
             // Update existing note
             // client
             setNotes(prevNotes => 
               prevNotes.map(note => 
                 note.id === currentNote.id ? { ...note, title, content,isSelected:false } : note
               )
             )
             
             navigateAndResetAllRoutes("home")
             // server
             await editNotes(account.uid, currentNote.id, title, content)
           } else {
             // Create new note
             const tempId = `temp-${Math.random().toString(36).substr(2, 9)}`
             const newNote = { id: tempId, title, content, isSelected: false }
             
             // Optimistic UI update
             setNotes(prev => [...prev, newNote])
             navigateAndResetAllRoutes( "home")
             // Server update
             const uploadedNote = await uploadsNote(account.uid, title, content,currentFolder)
             // Update with real ID
             setNotes(prevNotes => 
               prevNotes.map(note => 
                 note.id === tempId ? { ...note, id: uploadedNote.id } : note
               )
             )
           }
           
        
         } catch (error) {
           console.error("Error saving note:", error)
           // Rollback UI update if needed
         }
       }
       const handleContent = ( value) => {
        setNote(prev => ({ ...prev, ["content"]: value }))
      } 
      const handleTitle = ( value) => {
        setNote(prev => ({ ...prev, ["title"]: value }))
      }  
       return {handleSave,handleContent,handleTitle}
}
export default useNotesScreenUtils