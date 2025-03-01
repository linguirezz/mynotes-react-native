import {View,Text} from 'react-native';
const NotesByCategory = ({ notes }) => {
    const categories = [...new Set(notes.map(note => note.category))];
  
    return (
      <View>
        {categories.map(category => (
          <View key={category}>
            <Text style={{ fontWeight: 'bold' }}>{category}</Text>
            {notes.filter(note => note.category === category).map(note => (
              <Text key={note.id}>{note.title}</Text>
            ))}
          </View>
        ))}
      </View>
    );
  };