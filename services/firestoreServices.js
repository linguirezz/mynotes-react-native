import { getFirestore,collection,addDoc,serverTimestamp,getDocs,getDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import app from "../firebase.js";
import { navigateAndResetAllRoutes } from "../navigation/navigationFunction.js";
const db = getFirestore(app)
console.log("hello world")
// create
async function uploadsNote(userId,title,content){
   try {
    console.log("upload notes")
    console.log(userId)
    const notesCollectionRef = collection(db,`users/${userId}/notes`)
    const docRef = await addDoc(notesCollectionRef,{
        createdAt:serverTimestamp(),
        title,
        content        
    })
    
    console.log("note succes to be added with id :",docRef.id)
    return {id:docRef.id}
   } catch (error) {
    console.error("ups.. ada yang salah pada logika upload")
    console.error(error)
   }
}
// read (get all docs)
async function getNotes(userId){
    try {
        console.log("from getNotes",userId)
        const notesCollectionRef = collection(db,`users/${userId}/notes`)
        const querySnapShot = await getDocs(notesCollectionRef)
        const notes = []
        querySnapShot.forEach((doc)=>{
            const docId = doc.id
            const data = doc.data()
            notes.push({id:docId,data:data})
           
        }    
    )
    return notes
    } catch (error) {
        console.error("ups ... there is something wrong with your getnotes function!!")
        console.error(error)
    }
  
} 
// read (get a spesific doc)
async function getNote(userId,docId) {
    try {
        const docRef = doc(db,`users/${userId}/notes`,docId);
        const note = await getDoc(docRef);
        if(note.exists()){
            const data = note.data();
            return {id:note.id,data}
        }
       
    } catch (error) {
        console.error("ups ... there is something wrong with your getnotes function!!")
        console.error(error)
    }
   
}
// update
async function editNotes(userId,noteId,title,content){
    
    try {
    console.log(
        `userId :${userId}\n noteId:${noteId}\n title:${title} content:${content}`
    )
    const notesDocRef = doc(db,`users/${userId}/notes/${noteId}`)

    await updateDoc(notesDocRef,{
            title,
            content,
            message:"updated",
            updatedAt:serverTimestamp()
        })
        console.log(`note with id : ${noteId} been edited`)
    } catch (error) {
        console.error("ups ... there is something wrong with your editNotes function!!")
        console.error(error)
    }
}
// delete
async function deleteNote(userId,noteId){
    try {
        const notesDocRef = doc(db,`users/${userId}/notes/${noteId}`)
        await deleteDoc(notesDocRef);
        console.log(`notes with id ${noteId} has been deleted`)
    } catch (error) {
        console.error("ups ... there is something wrong with your deleteNotes function!!")
        console.error(error)
    }
    
}
// clear
function clearNote(){
    null
}
export {uploadsNote,getNotes,getNote,editNotes,deleteNote,clearNote}