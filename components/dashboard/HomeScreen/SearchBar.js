import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity,Text } from 'react-native';
import styles from '../../../styles/dashboard/home/style';
import { useNoteContext } from '../../../contexts/notesContext';

function SearchBar() {
  const { notes, setNotes } = useNoteContext();
  const notesCopy = useRef([...notes]);
  const [isDeleteBtnMounted, setIsDeleteBtnMounted] = useState(false);
  const [words, setWords] = useState("");
  const handleChange = (text) => {
    setWords(text);
    if (!text.trim()) {
      setIsDeleteBtnMounted(false);
      setNotes(notesCopy.current);
    } else {
      setIsDeleteBtnMounted(true);
      const notesFound = notesCopy.current.filter(note => note.content.includes(text) || note.title.includes(text));
      setNotes(notesFound);
    }
  };

  const handleClearInput = () => {
    setNotes(notesCopy.current);
    setWords("");
    setIsDeleteBtnMounted(false);
  };

  return (
    <View style={styles.searchBar}>
      <View style={styles.searchphotoBar}></View>
      <TextInput
        style={styles.barTextInput}
        placeholder='Search Notes'
        placeholderTextColor={"#4B527A"}
        onChangeText={(text) => handleChange(text)}
        value={words}
      />
      {isDeleteBtnMounted && (
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            backgroundColor: "red",
            marginHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleClearInput}
        >
          <Text>X</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default SearchBar;
