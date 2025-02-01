import { createContext, useContext, useState } from "react";

// Membuat context
const NoteContext = createContext();

// Membuat provider
export function NoteProvider({ children }) {
    const [noteContext, setNoteContext] = useState({
        id: ""
    });

    return (
        <NoteContext.Provider value={{ noteContext, setNoteContext }}>
            {children}
        </NoteContext.Provider>
    );
}

// Membuat custom hook untuk menggunakan context
export function useNoteContext() {
    return useContext(NoteContext);
}