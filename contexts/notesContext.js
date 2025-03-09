import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuthContext } from "./authContext";
import { getNotes } from "../services/firestoreServices";

// Membuat context
const NoteContext = createContext();

// Membuat provider
export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [note, setNote] = useState({ title: "", content: "" });
  const { account } = useAuthContext();

  // Fungsi untuk mengambil catatan dari Firebase
  const fetchNotes = useCallback(async () => {
    if (!account?.uid) return; // Pastikan account.uid ada

    setIsLoading(true);
    setError(null);

    try {
      const data = await getNotes(account.uid);
      if (data) {
        const notesSnapshot = data.map((note) => ({
          id: note.id,
          title: note.data.title,
          content: note.data.content,
          parentFolderId : note.data.parentFolderId,
          isSelected: false,
          isPinned: false,
        }));
        setNotes(notesSnapshot);
      } else {
        console.log("No data detected");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [account?.uid]);

  // Ambil catatan saat account.uid berubah
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Track selected note
  useEffect(() => {
    const selected = notes.find((note) => note.isSelected);
    if (selected) {
      setCurrentNote(selected);
      setNote({ title: selected.title, content: selected.content });
    } else {
      setCurrentNote(null);
      setNote({ title: "", content: "" });
    }
  }, [notes]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        isLoading,
        setIsLoading,
        currentNote,
        setCurrentNote,
        note,
        setNote,
        error,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

// Membuat custom hook untuk menggunakan context
export function useNoteContext() {
  return useContext(NoteContext);
}