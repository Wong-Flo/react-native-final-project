import { Text, View } from 'react-native';
import type { Goal } from '../../migrations/00000-createTableGoals';
import styles from '../styles/styles';

type Props = {
  goal: Goal;
};

export default function GoalItem({ goal }: Props) {
  const { goalTitle, goalAmountContent } = goal;

  return (
    <>
      <View>
        <View style={styles.card}>
          <Text>{goalTitle}</Text>
          <Text>{goalAmountContent}€</Text>
        </View>
      </View>
    </>
  );
}
