import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles/styles';

// Define the type for each goal item
interface GoalItem {
  id: string;
  goal: string;
  goalAmount: string;
  color: string;
}

export default function App() {
  const [goal, setGoal] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [goals, setGoals] = useState<GoalItem[]>([]);

  const addGoal = () => {
    if (!goal || !goalAmount) return; // Only proceed if both fields are filled

    const newGoal: GoalItem = {
      id: Date.now().toString(), // Unique ID based on timestamp
      goal,
      goalAmount,
      color: 'lightgrey', // Rotate colors for each goal
    };

    setGoals([...goals, newGoal]); // Add the new goal to the list
    setGoal(''); // Clear goal input field
    setGoalAmount(''); // Clear goal amount input field
  };

  // Function to delete a goal by its ID
  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id)); // Filter out the goal with the specified ID
  };

  return (
    <View style={styles.goalContainer}>
      {/* Display list of goals in a 3x3 grid */}
      <FlatList
        data={goals}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.noteItem, { backgroundColor: item.color }]}>
            {/* Delete Button in the Top-Right Corner */}
            <TouchableOpacity
              onPress={() => deleteGoal(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
            {/* Note Content */}
            <Text style={styles.noteText}>{item.goal}</Text>
            <Text style={styles.goalText}>Goal: ${item.goalAmount}</Text>
          </View>
        )}
        contentContainerStyle={styles.notesContainer}
      />

      {/* Input section fixed to bottom */}
      <TextInput
        placeholder="Enter goal"
        style={styles.goalNoteInput}
        value={goal}
        onChangeText={setGoal}
      />
      <TextInput
        placeholder="Enter goal amount"
        style={styles.goalNoteInput}
        value={goalAmount}
        onChangeText={setGoalAmount}
        keyboardType="numeric"
      />
      <View style={{ width: '50%', alignSelf: 'center', paddingTop: 10 }}>
        <Button title="Add Goal" onPress={addGoal} />
      </View>
    </View>
  );
}
