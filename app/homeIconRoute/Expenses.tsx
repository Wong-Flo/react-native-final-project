import { Text, View } from 'react-native';
import CreateGoal from '../Components/GoalComponents/CreateGoal';
import styles from '../styles/styles';

export default function Goals() {
  return (
    <View style={styles.goalContainer}>
      <Text>Create a New Goal</Text>
      <CreateGoal />
    </View>
  );
}
