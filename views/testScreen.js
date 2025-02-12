import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TestScreen = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        { text: 'Logout', onPress: () => console.log('Logout berhasil') },
      ]
    );
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => setMenuVisible(!isMenuVisible)}
        style={styles.profileButton}
      >
        <Ionicons name="person-circle-outline" size={32} color="black" />
      </TouchableOpacity>

      {isMenuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Pengaturan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text>Edit Profil</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginRight: 16,
  },
  profileButton: {
    padding: 8,
  },
  menuContainer: {
    position: 'absolute',
    right: 0,
    top: 45,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 150,
    zIndex: 999,
  },
  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logoutText: {
    color: 'red',
  },
});

export default TestScreen;