import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Text, View } from 'react-native';
import type { Goal } from '../../../migrations/00000-createTableGoals';
import styles from '../../styles/styles';

type Props = {
  goal: Goal;
};

export default function GoalItem({ goal }: Props) {
  const { goalTitle, goalAmountContent } = goal;

  return (
    <>
      <View>
        <View style={styles.card}>
          <FontAwesome6
            name="map-pin"
            size={24}
            color="red"
            style={styles.pinIcon}
          />
          <Text style={styles.noteText}>{goalTitle}</Text>
          <Text style={styles.goalText}>{goalAmountContent}€</Text>
        </View>
      </View>
    </>
  );
}
