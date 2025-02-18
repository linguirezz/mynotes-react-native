import React from 'react'
import {View,TextInput} from "react-native"
import styles from '../../styles/dashboard/home/style'
function SearchBar() {
  return (
    <View style={styles.searchBar}>
    <View style={styles.searchphotoBar}></View>
    <TextInput style={styles.barTextInput} placeholder='Search Notes' placeholderTextColor={"#4B527A"} />
  </View>
  )
}

export default SearchBar