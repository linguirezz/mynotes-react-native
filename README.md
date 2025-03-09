//android-keytools 339796359819-gdbn6ps61u31qcfokmib2pfkrvc9mdk6.apps.googleusercontent.com
//android-eas 339796359819-b8i40e8djvlabku9kn41t7sje36mqv9a.apps.googleusercontent.com
version alpha 0.1.0 :
- read , edit ,write , and delete notes
- authentication 
todo :
 - buat fitur organizing notes into folders
   1. create a collection which the name is folders
   2. create document that contains : name folder , induk folder, dan time stamp
   3. saat menulis notes , notes akan dilabeli sesuai dengan folder nya
   BUG : notes tidak muncul sesuai dengan foldernya dan tidak ada cara untuk kembali ke folder root
       







  refactoring strategy :
Membuat kode yang berantakan menjadi bersih dan mudah dibaca adalah langkah penting dalam pengembangan perangkat lunak. Berikut adalah **strategi profesional** yang bisa Anda terapkan untuk membersihkan dan merapikan kode Anda:

---

### **1. Pisahkan Kode ke dalam Komponen Kecil**
- **Prinsip**: *"Satu komponen, satu tanggung jawab"*.
- **Aksi**:
  - Pisahkan komponen besar seperti `HomeScreen` menjadi komponen-komponen kecil yang reusable.
  - Contoh:
    - Buat komponen terpisah untuk `Header`, `NoteItem`, `EditMenu`, `ProfileMenu`, dll.

#### Contoh:
```javascript
// components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Header = ({ title, onLoginPress, onProfilePress, isGuest }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{title}</Text>
      {isGuest ? (
        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onProfilePress}>
          <View style={styles.profile} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
```

---

### **2. Gunakan Custom Hooks**
- **Prinsip**: Pisahkan logika bisnis dari UI.
- **Aksi**:
  - Buat custom hook untuk menangani logika seperti manajemen state, fetching data, atau event handling.

#### Contoh:
```javascript
// hooks/useNotes.js
import { useState } from 'react';

const useNotes = (initialNotes) => {
  const [notes, setNotes] = useState(initialNotes);

  const handleSelectAll = () => {
    const newSelectedAll = notes.every((note) => note.isSelected);
    const updatedNotes = notes.map((note) => ({
      ...note,
      isSelected: !newSelectedAll,
    }));
    setNotes(updatedNotes);
  };

  const handlePinNotes = () => {
    const updatedNotes = notes.map((note) =>
      note.isSelected ? { ...note, isPinned: !note.isPinned } : note
    );
    setNotes(updatedNotes);
  };

  return { notes, setNotes, handleSelectAll, handlePinNotes };
};

export default useNotes;
```

---

### **3. Gunakan Konstanta untuk String dan Nilai Hardcoded**
- **Prinsip**: Hindari *magic values*.
- **Aksi**:
  - Simpan string, warna, atau nilai hardcoded dalam konstanta atau file terpisah.

#### Contoh:
```javascript
// constants/colors.js
export const colors = {
  primary: '#007BFF',
  danger: '#DC3545',
  background: '#F8F9FA',
};

// constants/strings.js
export const strings = {
  login: 'Login',
  logout: 'Log out',
  settings: 'Settings',
};
```

---

### **4. Pisahkan Styles ke File Terpisah**
- **Prinsip**: Pisahkan gaya dari logika komponen.
- **Aksi**:
  - Simpan semua gaya dalam file terpisah dan impor ke komponen.

#### Contoh:
```javascript
// styles/homeStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
```

---

### **5. Gunakan Utility Functions**
- **Prinsip**: Pisahkan fungsi utilitas yang digunakan di banyak tempat.
- **Aksi**:
  - Buat file terpisah untuk fungsi utilitas seperti formatter, validator, atau helper.

#### Contoh:
```javascript
// utils/noteUtils.js
export const filterSelectedNotes = (notes) => {
  return notes.filter((note) => note.isSelected);
};

export const toggleNoteSelection = (notes, id) => {
  return notes.map((note) =>
    note.id === id ? { ...note, isSelected: !note.isSelected } : note
  );
};
```

---

### **6. Gunakan ESLint dan Prettier**
- **Prinsip**: Otomatisasi formatting dan pengecekan kode.
- **Aksi**:
  - Pasang ESLint dan Prettier untuk memastikan konsistensi gaya kode.
  - Contoh konfigurasi `.eslintrc.js`:
    ```javascript
    module.exports = {
      extends: ['eslint:recommended', 'plugin:react/recommended'],
      rules: {
        'react/prop-types': 'off',
        'no-unused-vars': 'warn',
      },
    };
    ```

---

### **7. Dokumentasikan Kode**
- **Prinsip**: Buat kode yang mudah dipahami oleh orang lain (atau diri Anda di masa depan).
- **Aksi**:
  - Tambahkan komentar untuk menjelaskan logika yang kompleks.
  - Gunakan JSDoc untuk mendokumentasikan fungsi dan komponen.

#### Contoh:
```javascript
/**
 * Handles the selection of all notes.
 * Toggles the selection state of all notes.
 */
const handleSelectAll = () => {
  const newSelectedAll = notes.every((note) => note.isSelected);
  const updatedNotes = notes.map((note) => ({
    ...note,
    isSelected: !newSelectedAll,
  }));
  setNotes(updatedNotes);
};
```

---

### **8. Refactor Kode Anda**
Berdasarkan strategi di atas, berikut adalah contoh refactor untuk `HomeScreen`:

#### a. Pisahkan Komponen:
- `Header`
- `NoteItem`
- `EditMenu`
- `ProfileMenu`

#### b. Gunakan Custom Hook:
- `useNotes` untuk manajemen state notes.

#### c. Pisahkan Styles:
- Simpan semua gaya di `styles/homeStyles.js`.

#### d. Gunakan Utility Functions:
- Simpan fungsi utilitas di `utils/noteUtils.js`.

---

### **Contoh Refactor**
#### `HomeScreen.js` (Setelah Refactor)
```javascript
import React from 'react';
import { View, ScrollView, Modal, TouchableOpacity } from 'react-native';
import Header from './components/Header';
import NoteItem from './components/NoteItem';
import EditMenu from './components/EditMenu';
import ProfileMenu from './components/ProfileMenu';
import useNotes from './hooks/useNotes';
import { styles } from './styles/homeStyles';

function HomeScreen({ navigation }) {
  const { notes, handleSelectAll, handlePinNotes } = useNotes(initialNotes);
  const [editMenu, setEditMenu] = React.useState({ isVisible: false });
  const [profileMenu, setProfileMenu] = React.useState({ isVisible: false });

  return (
    <View style={styles.container}>
      <Header
        title="My Notes"
        onLoginPress={() => navigation.navigate('Login')}
        onProfilePress={() => navigation.navigate('Profile')}
        isGuest={false}
      />
      <ScrollView>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onPress={() => handleNotePress(note.id)}
            onLongPress={() => handleNoteLongPress(note.id)}
          />
        ))}
      </ScrollView>
      <EditMenu
        isVisible={editMenu.isVisible}
        onClose={() => setEditMenu({ isVisible: false })}
        onSelectAll={handleSelectAll}
        onPinNotes={handlePinNotes}
      />
      <ProfileMenu
        isVisible={profileMenu.isVisible}
        onClose={() => setProfileMenu({ isVisible: false })}
        onLogout={() => handleLogout()}
        onSettings={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

export default HomeScreen;
```

---

### **Kesimpulan**
Dengan menerapkan strategi di atas, kode Anda akan menjadi:
- **Lebih bersih**.
- **Mudah dibaca**.
- **Mudah di-maintain**.
- **Reusable** (komponen dan fungsi dapat digunakan kembali).

Mulailah dengan memisahkan komponen dan logika, lalu lanjutkan dengan menerapkan praktik terbaik lainnya. Jika ada bagian yang masih membingungkan, beri tahu saya! 😊


