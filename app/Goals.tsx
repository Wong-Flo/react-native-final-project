import React, { useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import styles from './styles/styles';

// Define the type for each note item
interface NoteItem {
  id: string;
  note: string;
  goalAmount: string;
  color: string;
  noteItem: string;
}

export default function App() {
  const [note, setNote] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [notes, setNotes] = useState<NoteItem[]>([]);

  // Array of colors for sticky notes
  const colors = [
    '#FFEB3B',
    '#FFC107',
    '#FF5722',
    '#4CAF50',
    '#03A9F4',
    '#9C27B0',
    '#E91E63',
    '#FF9800',
    '#009688',
  ];

  // Simplified function to add a new note
  const addNote = () => {
    if (!note || !goalAmount) return; // Only proceed if both fields are filled

    const newNote: NoteItem = {
      id: Date.now().toString(), // Unique ID based on timestamp
      note,
      goalAmount,
      color: colors[notes.length % colors.length], // Rotate colors for each note
    };

    setNotes([...notes, newNote]); // Add the new note to the list
    setNote(''); // Clear note input field
    setGoalAmount(''); // Clear goal amount input field
  };

  return (
    <View style={styles.goalContainer}>
      {/* Display list of notes in a 3x3 grid */}
      <FlatList
        data={notes}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.noteItem, { backgroundColor: item.color }]}>
            <Text style={styles.noteText}> {item.note}</Text>
            <Text style={styles.goalText}>Goal: ${item.goalAmount}</Text>
          </View>
        )}
        contentContainerStyle={styles.notesContainer}
      />

      {/* Input section fixed to bottom */}

      <TextInput
        placeholder="Enter note"
        style={styles.goalNoteInput}
        value={note}
        onChangeText={setNote}
      />
      <TextInput
        placeholder="Enter goal amount"
        style={styles.goalNoteInput}
        value={goalAmount}
        onChangeText={setGoalAmount}
        keyboardType="numeric"
      />
      <View
        style={{
          width: '50%',
          alignSelf: 'center',
          paddingTop: 10,
        }}
      >
        <Button title="Add Note" onPress={addNote} />
      </View>
    </View>
  );
}
