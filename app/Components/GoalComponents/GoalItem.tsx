import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Text, TouchableOpacity, View } from 'react-native';
import type { Goal } from '../../../migrations/00000-createTableGoals';
import styles from '../../styles/styles';

type Props = {
  goal: Goal; // The goal data being passed in
  onDelete: (goalId: string) => void; // Function to delete the goal, passed from parent
};

export default function GoalItem({ goal }: Props) {
  const { goalTitle, goalAmountContent } = goal;

  return (
    <View style={styles.card}>
      <FontAwesome6
        name="map-pin"
        size={24}
        color="#cd5c5c"
        style={styles.pinIcon}
      />

      {/* Goal title and amount */}
      <Text style={styles.noteText}>{goalTitle}</Text>
      <Text style={styles.goalText}>{goalAmountContent}€</Text>

      {/* Delete button (X) */}
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}
