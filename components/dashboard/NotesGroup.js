import React from 'react'
import {View} from "react-native"
import { useAuthContext } from '../../contexts/authContext';
import styles from '../../styles/dashboard/home/style';
import SquareBoxes from './elements/SquareBoxes';
import RectangleBoxes from './elements/RectangleBoxes';
function NotesGroup() {
    const {account}=useAuthContext();
    
  return (
    <>
                  {!account ? (
              <Text>loading...</Text> // Tampilkan teks loading
            ) : (
              //notes section
            <View style={styles.notesSection}>
              {/* Kelompok notes kotak (indeks genap) */}
                 <SquareBoxes/>
              {/* Kelompok notes persegi panjang (indeks ganjil) */}
                 <RectangleBoxes/>
            </View>
          )} 
    </>
  )
}

export default NotesGroup