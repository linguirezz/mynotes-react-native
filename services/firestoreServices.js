import { getFirestore,collection,addDoc,serverTimestamp,getDocs,getDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import app from "../firebase.js";
import { navigateAndResetAllRoutes } from "../navigation/navigationFunction.js";
import { useAuthContext } from "../contexts/authContext.js";
import { buildFolderTree } from "../utils/createPath.js";
const db = getFirestore(app)

// create
async function uploadsNote(userId,title,content,parentFolderId = null){
   try {
    console.log("upload notes")
    console.log(userId)
    const notesCollectionRef = collection(db,`users/${userId}/notes`)
    const docRef = await addDoc(notesCollectionRef,{
        createdAt:serverTimestamp(),
        title,
        content,
        parentFolderId        
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
// get Folders 
async function getFolders(foldersPath){
    const {account} =useAuthContext();
    const {uid} = account
    const folderRef = collection(db,`users/${uid}/foldersPath`)

}

// add folder
async function createFolder(userId,folderId, parentFolderId = "all folders") {
    console.log("masukkk")
    console.log(parentFolderId)
    try {
        const folderRef = collection(db, `users/${userId}/folders`);
        const docRef = await addDoc(folderRef, {
            folderId,
            parentFolderId,
            createdAt: serverTimestamp()
        });

        console.log(`User dengan uid ${userId} sukses membuat folder yang bernama ${folderId} dengan result: ${docRef.id}`);
        return { success: true, docId: docRef.id };
    } catch (error) {
        console.error("Error terjadi pada fungsi createFolder:", error);
        return { success: false, message: "Terjadi kesalahan pada fungsi service", error: error.message };
    }   
}

async function readFolders(userId, parentFolderId = "all folders") {
    console.log(userId)
    // Validasi userId
    if (!userId) {
        console.error("userId tidak tercantum");
        return { success: false, message: "UID user tidak tercantum" };
    }

    try {
        // Ambil data folders dari Firestore
        const folderRef = collection(db, `users/${userId}/folders`);
        const foldersSnapshot = await getDocs(folderRef);

        // Konversi snapshot ke array of folders
        const folders = foldersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Bangun hierarki folder
        const folderTree = buildFolderTree(folders, parentFolderId);
        return { success: true, folders: folderTree };
    } catch (error) {
        console.error("Terjadi error pada readFolders:", error);
        return { success: false, message: error.message };
    }
}

async function moveNotesIntoFolder(userId, selectedIds,destinationFolderId) {
    try {
        // Buat list yang berisi doc ref
        const docsRef = selectedIds.map(selectedId => 
            doc(db, `users/${userId}/notes/${selectedId}`)
        );

        // Eksekusi semua docRef yang ada dengan di-edit
        const updatePromises = docsRef.map((docRef) => 
            updateDoc(docRef, {
                parentFolderId: destinationFolderId // Ambil nama folder yang sesuai
            })
        );

        // Tunggu semua operasi update selesai
        await Promise.all(updatePromises);

        console.log("Catatan berhasil dipindahkan ke folder.");
        return { success: true, message: "Catatan berhasil dipindahkan ke folder." };
    } catch (error) {
        console.error("Terjadi error saat memindahkan catatan:", error);
        return { success: false, message: error.message };
    }
}


export {uploadsNote,getNotes,getNote,editNotes,deleteNote,createFolder,readFolders,moveNotesIntoFolder}