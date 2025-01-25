import { getFirestore,collection,addDoc,serverTimestamp,getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import app from "../firebase.js";
const db = getFirestore(app)
console.log("hello world")
// create
async function uploadsNote(userId){
   try {
    const notesCollectionRef = collection(db,`users/${userId}/notes`)
    const docRef = await addDoc(notesCollectionRef,{
        createdAt:serverTimestamp()
    })
    console.log("note succes to be added with id :",docRef.id)
   } catch (error) {
    console.error("ups.. ada yang salah pada logika upload")
   }
}
// read
async function getNotes(userId){
    try {
        const notesCollectionRef = collection(db,`users/${userId}/notes`)
        const querySnapShot = await getDocs(notesCollectionRef)
        querySnapShot.forEach((doc)=>{
            const docId = doc.id
            const data = doc.data()
            console.log(`${JSON.stringify(docId)}=${JSON.stringify(data)}`)
        })
    } catch (error) {
        console.error("ups ... there is something wrong with your getnotes function!!")
        console.error(error)
    }
  
} 
// update
async function editNotes(userId,noteId){
    console.log("hadir")
    try {
    const notesDocRef = doc(db,`users/${userId}/notes/${noteId}`)

    await updateDoc(notesDocRef,{
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
export {uploadsNote,getNotes,editNotes,deleteNote,clearNote}