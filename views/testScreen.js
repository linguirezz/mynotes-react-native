import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Vibration,
  Animated,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');
const ELEMENT_SIZE = 80;
const COLS = 4;

export default function App() {
  const [elements, setElements] = useState(
    Array(8).fill(null).map((_, i) => ({
      id: i,
      text: `Item ${i+1}`,
      position: {
        x: (i % COLS) * (width/COLS),
        y: Math.floor(i/COLS) * (width/COLS)
      }
    }))
  );

  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleLongPress = (item, event) => {
    Vibration.vibrate(50);
    setSelectedItem(item);
    setMenuPosition({
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY
    });
    setMenuVisible(true);
  };

  const handleDelete = () => {
    setElements(elements.filter(el => el.id !== selectedItem.id));
    setMenuVisible(false);
  };

  const handleEdit = () => {
    // Implement edit logic here
    alert(`Editing ${selectedItem.text}`);
    setMenuVisible(false);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      {elements.map((el) => (
        <TouchableOpacity
          key={el.id}
          style={[
            styles.element,
            {
              transform: [
                { translateX: el.position.x },
                { translateY: el.position.y }
              ]
            }
          ]}
          onLongPress={(e) => handleLongPress(el, e)}
          delayLongPress={500}
        >
          <View style={styles.icon}>
            <Text style={styles.text}>{el.text}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Modal
        transparent
        visible={menuVisible}
        onRequestClose={closeMenu}
      >
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={closeMenu}
        >
          <View style={[styles.menu, { left: menuPosition.x - 100, top: menuPosition.y - 50 }]}>
            <TouchableOpacity style={styles.menuButton} onPress={handleEdit}>
              <Text style={styles.menuText}>✏️ Edit</Text>
            </TouchableOpacity>    
            <TouchableOpacity style={styles.menuButton} onPress={handleDelete}>
              <Text style={[styles.menuText, styles.deleteText]}>🗑 Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  element: {
    position: 'absolute',
    width: ELEMENT_SIZE,
    height: ELEMENT_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 70,
    height: 70,
    backgroundColor: '#2196F3',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  menu: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
  },
});